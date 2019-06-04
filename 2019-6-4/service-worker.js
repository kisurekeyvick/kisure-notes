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
 * 
 */

// 案例

// 这里引入了Cache API的一个polyfill，这个polyfill支持使得在较低版本的浏览器下也可以使用Cache Storage API
self.importScripts('./serviceworker-cache-polyfill.js');

// 声明需要缓存的静态资源
var urlsToCache = [
  '/',
  '/index.js',
  '/style.css',
  '/favicon.ico',
];

// 当前缓存的Cache Storage Name，这里可以理解成Cache Storage是一个DB，而CACHE_NAME则是DB名
var CACHE_NAME = 'counterxing';

self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});


self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['counterxing'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

