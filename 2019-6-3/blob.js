/** 
 * https://juejin.im/entry/5937c98eac502e0068cf31ae
 * 
 * blob
 */

/** 
 * 什么是blob
 * 
 * HTML5中，Blob是一种JavaScript数据类型，用于存储二进制数据。
 * 此对象中存储的数据没有必要非得是JavaScript原生格式数据，也就是没必要是JavaScript内部对象。
 * 比如可以是File对象，它继承Blob对象，并扩展了一些功能。
 */

/** 
 * Blob构造函数
 * var blob = new Blob(data[, options]));
 * 
 * Blob构造函数接受两个参数:
 * data: 参数data是一组数据，所以必须是数组，即使只有一个字符串也必须用数组装起来。
 * options：参数options是对这一Blob对象的配置属性
 *          'text/csv,charset=UTF-8' 设置为csv格式，并设置编码为UTF-8，
 *          'text/html' 设置成html格式。
 * 
 * 例如：var blob = new Blob(['我是Blob'],{type: 'text/html'});
 */

/** 
 * Blob属性
 * blob.size   //Blob大小（以字节为单位）
 * blob.type   //Blob的MIME类型，如果是未知，则是“ ”（空字符串）
 */

/** 
 * URL.createObjectURL()
 * 
 * URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。
 * 这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
 * 
 * objectURL = URL.createObjectURL(blob);
 * 
 * 使用URL.createObjectURL()函数可以创建一个Blob URL，
 * 参数blob是用来创建URL的File对象或者Blob对象，返回值格式是：blob://URL。
 * 
 * 在每次调用 createObjectURL() 方法时，都会创建一个新的 URL 对象，即使你已经用相同的对象作为参数创建过。
 * 当不再需要这些 URL 对象时，每个对象必须通过调用 URL.revokeObjectURL() 方法传入创建的URL为参数，用来释放它。
 * 浏览器会在文档退出的时候自动释放它们，但是为了获得最佳性能和内存使用状况，应该在安全的时机主动释放掉它们。
 */

/**
 * URL.revokeObjectURL()
 * 
 * URL.revokeObjectURL() 静态方法用来释放一个之前通过调用 URL.createObjectURL() 
 * window.URL.revokeObjectURL(objectURL);
 */

/** 
 * Blob的使用
 */
var data= 'Hello world!';  
var blob = new Blob([data], {   
  type: 'text/html,charset=UTF-8'   
});
window.URL = window.URL || window.webkitURL; 
document.querySelector("#getData").href = URL.createObjectURL(blob);

/** 
 * Blob的响应
 */
function ajax() {
    window.URL = window.URL || window.webkitURL;  // Take care of vendor prefixes.
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/path/to/image.png', true);
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
        if (this.status == 200) {
            var blob = this.response;

            var img = document.createElement('img');
            var URL = window.URL || window.webkitURL;  //兼容处理
            var objectUrl = URL.createObjectURL(blob);
            img.onload = function(e) {
            window.URL.revokeObjectURL(img.src); // 释放 url.
            };

            img.src = objectUrl;
            document.body.appendChild(img);
            // ...
        }
    };

    xhr.send();
}

/** 
 * blob总结：
 * Blob对象大多是运用在，处理大文件分割上传（利用Blob中slice方法），
 * 处理图片canvas跨域(避免增加crossOrigin = "Anonymous",生成当前域名的url，然后 URL.revokeObjectURL()释放，createjs有用到)，
 * 以及隐藏视频源路径等等。
 * 
 * (1)大文件分割上传
    function upload(blobOrFile) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/server', true);
        xhr.onload = function(e) { ... };
        xhr.send(blobOrFile);
    }

    document.querySelector('input[type="file"]').addEventListener('change', function(e) {
        var blob = this.files[0];

        // 限制每次上传文件的最大值
        const BYTES_PER_CHUNK = 1024 * 1024; // 1MB chunk sizes.
        const SIZE = blob.size;

        var start = 0;
        var end = BYTES_PER_CHUNK;

        while(start < SIZE) {
            upload(blob.slice(start, end));

            start = end;
            end = start + BYTES_PER_CHUNK;
        }
    }, false);
 * 
 * (2)图片跨域请求，处理跨域问题
 *  
 * 
 * (3)隐藏视频源路径
    var video = document.getElementById('video');
    var obj_url = window.URL.createObjectURL(blob);
    video.src = obj_url;
    video.play();
    window.URL.revokeObjectURL(obj_url);
 */
