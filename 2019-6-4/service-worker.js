/**
 * https://segmentfault.com/a/1190000016446125
 * 
 * Service Worker   离线缓存
 * 
 * (1)什么是Service Worker
 * Service Worker本质上充当Web应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理。
 * Service Worker是一个网络代理，它可以控制Web页面的所有网络请求
 * 
 * (2)Service Worker的作用
 * 用于浏览器缓存
 * 实现离线Web APP
 * 消息推送
 * 
 * (3)生命周期
 * Service Worker独立于浏览器JavaScript主线程，有它自己独立的生命周期
 * 如果需要在网站上安装Service Worker，则需要在JavaScript主线程中使用以下代码引入Service Worker
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('成功安装', registration.scope);
        }).catch(function(err) {
            console.log(err);
        });
    }
 
    此处，一定要注意sw.js文件的路径,示例中，处于当前域根目录下，这意味着，Service Worker和网站是同源的。
    可以为当前网站的所有请求做代理，如果Service Worker被注册到/imaging/sw.js下，那只能代理/imaging下的网络请求。

    安装完成后，Service Worker会经历以下生命周期：
        I:下载（download）
        II:安装（install）
        III:激活（activate）

    用户首次访问Service Worker控制的网站或页面时，Service Worker会立刻被下载。之后至少每24小时它会被下载一次。
    它可能被更频繁地下载，不过每24小时一定会被下载一次，以避免不良脚本长时间生效。

    在下载完成后，开始安装Service Worker，在安装阶段，通常需要缓存一些我们预先声明的静态资源，在我们的示例中，通过urlsToCache预先声明。

    在安装完成后，会开始进行激活，浏览器会尝试下载Service Worker脚本文件，下载成功后，会与前一次已缓存的Service Worker脚本文件做对比，
    如果与前一次的Service Worker脚本文件不同，证明Service Worker已经更新，会触发activate事件。完成激活。


    //////////////////////// Service Worker大致的生命周期 /////////////////////////
    (1) js主线程调用：navigator.serviceWorker.register，开始下载service worker
    (2) 下载完成以后，创建worker线程，触发install事件
    (3) service worker 一直处于激活状态，直到被销毁
    (4) 尝试拉去最新的worker脚本
    (5) 判断脚本是否需要更新，如果需要更新，那么安装最新的service worker,然后激活。如果不需要更新，那么直接完成，结束。
 */

// 案例

// 这里引入了Cache API的一个polyfill，这个polyfill支持使得在较低版本的浏览器下也可以使用Cache Storage API
importScripts('./serviceworker-cache-polyfill.js');

// 声明需要缓存的静态资源
var urlsToCache = [
  '/',
  '/index.js',
  '/style.css',
  '/favicon.ico',
];

// 当前缓存的Cache Storage Name，这里可以理解成Cache Storage是一个DB，而CACHE_NAME则是DB名
var CACHE_NAME = 'counterxing';

// 在安装完成后，尝试缓存一些静态资源
self.addEventListener('install', function(event) {
  // self.skipWaiting()执行，告知浏览器直接跳过等待阶段，淘汰过期的sw.js的Service Worker脚本，
  // 直接开始尝试激活新的Service Worker。
  self.skipWaiting();
  event.waitUntil(
    // 使用caches.open打开一个Cache，打开后，通过cache.addAll尝试缓存我们预先声明的静态文件
    caches.open(CACHE_NAME)
    .then(function(cache) {
      // 通过cache.addAll尝试缓存我们预先声明的静态文件
      return cache.addAll(urlsToCache);
    })
  );
});

// 监听fetch，代理网络请求
self.addEventListener('fetch', function(event) {
  // 页面的所有网络请求，都会通过Service Worker的fetch事件触发
  event.respondWith(
    // 通过caches.match尝试从Cache中查找缓存
    caches.match(event.request)
    .then(function(response) {
      // 缓存如果命中，则直接返回缓存中的response，否则，创建一个真实的网络请求
      if (response) {
        return response;
      }

      // 如果我们需要在请求过程中，再向Cache Storage中添加新的缓存，可以通过cache.put方法添加
      // 这里必须使用clone方法克隆这个请求,原因是response是一个Stream，为了让浏览器跟缓存都使用这个response
      // 一份到浏览器，一份到缓存中缓存
      // 只能被消费一次，想要再次消费，必须clone一次
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((res) => {
        if (!res || res.status !== 200) {
          return res;
        }

        // 消费过一次，又需要再克隆一次
        var responseToCache = res.clone();
        caches.open(CACHE_NAME)
            .then(function(cache) {
              // 再向Cache Storage中添加新的缓存，可以通过cache.put方法添加
              cache.put(event.request, responseToCache);
            });
        return res;
      });
    })
  );
});

/**
 * 注意：
 * 在项目中，一定要注意控制缓存，接口请求一般是不推荐缓存的！！！
 */

/** 
 * Service Worker总有需要更新的一天，随着版本迭代，某一天，
 * 我们需要把新版本的功能发布上线，此时需要淘汰掉旧的缓存，旧的Service Worker和Cache Storage如何淘汰呢？
 * 
 * (1)首先有一个白名单，白名单中的Cache是不被淘汰的
 * (2)之后通过caches.keys()拿到所有的Cache Storage，把不在白名单中的Cache淘汰
 * (3)淘汰使用caches.delete()方法。它接收cacheName作为参数，删除该cacheName所有缓存。
 */
self.addEventListener('activate', function(event) {
  // 白名单，白名单中的Cache是不被淘汰的
  var cacheWhitelist = ['counterxing'];

  event.waitUntil(
    // caches.keys()拿到所有的Cache Storage
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(name) {
          if (cacheWhitelist.indexOf(name) === -1) {
            // 如果不在白名单中的Cache，使用caches.delete()方法，来删除相关的cacheName
            return caches.delete(name);
          }
        })
      );
    })
  );
});

/**
 * 业务场景
 * 
 * https://segmentfault.com/a/1190000018376151
 */

/**
 * Service Worker是PWA的重要组成部分，其包含安装、激活、等待、销毁等四个生命周期。主要有以下的特性:
 * (1)一个独立的 worker 线程，独立于当前网页进程，有自己独立的 worker context
 * (2)一旦被 install，就永远存在，除非被手动 unregister
 * (3)用到的时候可以直接唤醒，不用的时候自动睡眠
 * (4)不能直接操作 DOM
 * (5)必须在 HTTPS 环境下才能工作( 或 http://localhost )
 * (6)
 */

