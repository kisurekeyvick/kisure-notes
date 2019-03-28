/**
 * 日期 Date, 整个地球分为二十四时区，每个时区都有自己的本地时间
 * UTC(协调世界时)、GMT(格林尼治标准时)
 * UTC是我们目前用的标准时间，GMT是老的时间计量标准
 */

// now是本地的时间。不是UTC时间
const now = new Date();
/** 
 * Thu Mar 28 2019 14:44:01 GMT+0800 (中国标准时间)
 * (1)该地区本地时领先UTC差8个小时 
 * (2)东八区时区差记为 +0800
*/

// 获取UTC时间 
const now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), 
now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());

/**
 * UTC时间是什么？
 * 中国大陆、中国香港、中国澳门、中国台湾、蒙古国、新加坡、马来西亚、菲律宾、西澳大利亚州的时间与UTC的时差均为+8，也就是UTC+8。
 * UTC时间：这套时间系统被应用于许多互联网和万维网的标准中
 */

/** 如果我们本地时间修改了，那么想要获取正确的时间，则可以选择获取服务器时间 */
function getServerDate(){
    var xhr = null;
    if(window.XMLHttpRequest){
      xhr = new window.XMLHttpRequest();
    }else{ // ie
      xhr = new ActiveObject("Microsoft")
    }

    // xhr.open需要设置为false，设置false的意思就是为同步
    xhr.open("GET","/",false);
    xhr.send(null);
    var date = xhr.getResponseHeader("Date");
    return new Date(date);
}

/**
 * Date.now()
 * 如果我们仅仅想要度量时间间隔，我们不需要整个 Date 对象,Date.now()，它会返回当前的时间戳。
 * 它相当于 new Date().getTime()，但它不会在中间创建一个 Date 对象。因此它更快，而且不会对垃圾处理造成额外的压力。
 */

/**
 * 总结：
 * UTC + 时区差＝本地时间
 * UTC是世界统一时间
 */
