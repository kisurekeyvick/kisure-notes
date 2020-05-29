/**
 * https://juejin.im/post/5d26aec1f265da1ba56b47ea
 * https://juejin.im/post/5ba0fe356fb9a05d2c43a25c
 * 
 * Service Worker
 */

/**
 * 什么是Service Worker?
 * 
 * - Service Worker的本质是一个Web Worker，它独立于JavaScript主线程，因此它不能直接访问DOM，也不能直接访问window对象，
 *      但是，Service Worker可以访问navigator对象，也可以通过消息传递的方式（postMessage）与JavaScript主线程进行通信。
 * - Service Worker是一个网络代理，它可以控制Web页面的所有网络请求。
 * - Service Worker具有自身的生命周期，使用好Service Worker的关键是灵活控制其生命周期。
 */

/**
 * Service Worker的作用
 * 
 * - 用于浏览器缓存
 * - 实现离线Web APP
 * - 消息推送
 */

self.importScripts('./serviceworker-cache-polyfill.js');

var urlsToCache = [
  '/',
  '/index.js',
  '/style.css',
  '/favicon.ico',
];

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

/**
 * polyfill
 * 
 * 第一行：self.importScripts('./serviceworker-cache-polyfill.js');，
 * 这里引入了Cache API的一个polyfill，这个polyfill支持使得在较低版本的浏览器下也可以使用Cache Storage API。
 * 想要实现Service Worker的功能，一般都需要搭配Cache API代理网络请求到缓存中。
 * 
 * 在Service Worker线程中，使用importScripts引入polyfill脚本，目的是对低版本浏览器的兼容
 */

/**
 * 使用一个urlsToCache列表来声明需要缓存的静态资源，再使用一个变量CACHE_NAME来确定当前缓存的Cache Storage Name，
 * 这里可以理解成Cache Storage是一个DB，而CACHE_NAME则是DB名：
 */ 

/**
 * Lifecycle
 * 
 * Service Worker独立于浏览器JavaScript主线程，有它自己独立的生命周期。
 * 如果需要在网站上安装Service Worker，则需要在JavaScript主线程中使用以下代码引入Service Worker
 */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('成功安装', registration.scope);
    }).catch(function(err) {
      console.log(err);
    });
}

/**
 * 让Service Worker和网站同源
 * 
 * 此处，一定要注意sw.js文件的路径，在我的示例中，处于当前域根目录下，这意味着，Service Worker和网站是同源的，
 * 可以为当前网站的所有请求做代理，如果Service Worker被注册到/imaging/sw.js下，那只能代理/imaging下的网络请求。
 */

/**
 * install
 * 
 * 在安装完成后，尝试缓存一些静态资源：
 */
self.addEventListener('install', function(event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});
/**
 * 首先，self.skipWaiting()执行，告知浏览器直接跳过等待阶段，淘汰过期的sw.js的Service Worker脚本，
 * 直接开始尝试激活新的Service Worker。然后使用caches.open打开一个Cache，打开后，
 * 通过cache.addAll尝试缓存我们预先声明的静态文件。
 */


/**
 * 监听fetch，代理网络请求
 * 
 * 页面的所有网络请求，都会通过Service Worker的fetch事件触发，Service Worker通过caches.match尝试从Cache中查找缓存，
 * 缓存如果命中，则直接返回缓存中的response，否则，创建一个真实的网络请求。
 */
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

/**
 * activate
 * 
 * Service Worker总有需要更新的一天，随着版本迭代，某一天，我们需要把新版本的功能发布上线，
 * 此时需要淘汰掉旧的缓存，旧的Service Worker和Cache Storage如何淘汰呢？
 */
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
/**
 * - 首先有一个白名单，白名单中的Cache是不被淘汰的。
 * - 之后通过caches.keys()拿到所有的Cache Storage，把不在白名单中的Cache淘汰。
 * - 淘汰使用caches.delete()方法。它接收cacheName作为参数，删除该cacheName所有缓存
 */
