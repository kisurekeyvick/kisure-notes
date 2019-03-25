/**
 * 1.用于判断一个值是否为整数
 * @param {*} value 
 */  
function judgeItervalNumber(value) {
  return typeof value === 'number' && parseInt(value, 10) === value;
}

/**
 * 2.判断一个值是否为float数
 */
function jdugeFloatNumber(value) {
  return typeof value === 'number' && !parseInt(value, 10) === value;
}
  
/**
 * 3.关于promise
 * 3.1 什么是promise?
 *    promise是异步编程的解决方法。
 */

/**
 * 3.2 promise是一个构造函数，new Promise 返回一个promise对象，接收一个excutor执行函数作为参数, 
 *     excutor有两个函数类型形参resolve reject。
 */
const promise = new Promise((resolve, reject) => {
    // 此处异步处理
    // 处理结束以后，调用resolve或者reject
});

/**
 * 3.3 promise 相当于一个状态机存在3种状态：pending、fulfilled、rejected
 * (1)promise对象初始化为pending
 * (2)当调用resolve(),那么状态会变为fulfilled
 * (3)当调用reject(),那么状态会变为rejected
 *  需要注意的是：promsie状态 只能由 pending => fulfilled/rejected, 一旦修改就不能再变
 */

/** 
 * 3.4 promise对象方法
 * (1)then()用于注册当resolve/reject的回调函数
 * (2)then()方法每一次调用以后，都会返回一个新的promise对象，所以可以使用链式写法
*/
promise.then(onFulfilled, onRrejected);
// 等同于
promise.then(onFulfilled)
        .catch(onRrejected);

/**
 * 3.5 promise的一些api
 *  promise.all()    接收一个promise对象数组为参数,只有全部为resolve才会调用 通常会用来处理 多个并行异步操作
 *  promise.race()   接收一个promise对象数组为参数,只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，
 *                   就会继续进行后面的处理,也就是执行then那一步方法。
 */
// 如果每一次在then中都返回数据，那么在下一次then的时候就可以接收到对应return的数据
new Promise((resolve, reject) => {
  resolve('66');
})
.then((res) => { console.log(res); return res; })   // 66
.then((res) => { console.log(res); return res; })   // 66
.then((res) => { console.log(res);})                // 66
.then((res) => { console.log(res);})                // undefined

/**
 * 3.6 promise的实现
 * https://juejin.im/post/5aa7868b6fb9a028dd4de672#heading-0
 * 或者promise.js也可以
 */

/** 
 * 4. 关于fetch,原生XHR,ajax之间比较
 * https://segmentfault.com/a/1190000012836882
 * https://github.com/camsong/blog/issues/2
*/

// 原生XHR
function ajax(method, url) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr.status === 304) {
        console.log(xhr.responseText);
        // xhr.responseText 是服务器返回给浏览器的数据
      }
    }
  };
}

/**
 * fetch和ajax不同，fetch的api不是事件机制，而是使用Promise的方式去处理
    (1)fetch('url....', option)
    option存在三个参数
    第一个参数：设置请求方法，method:'POST/GET/DELETE/PUT/PATCH'
    第二个参数：设置头部信息，一般使用JSON数据格式，所以设置ContentType为application/json。
    第三个参数：JSON内容的主体。因为JSON内容是必须的，所以当设置主体时会调用JSON.stringify。

    注意点:
    (1)fetch只对网络请求报错，如果是400或者500，都会当做成功的请求，需要封装去处理。
    (2)fetch默认不会带cookie，需要添加配置。
    (3)fetch没有办法原生监测请求的进度，而XHR可以
    
    优点：
    fetch可以实现跨域
    因为同源策略的问题，浏览器的请求是可能随便跨域的——一定要有跨域头或者借助JSONP，但是，fetch中可以设置mode为"no-cors"（不跨域）
 */

fetch('some-url', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(content),
  mode:"cors", // cors代表允许跨域， no-cors代表不允许跨域
});


/** 
 * 5. 关于HTTP协议支持的六种请求方法之间的区别。
 * https://blog.csdn.net/u010529455/article/details/42918639
   https://blog.csdn.net/varyall/article/details/80895945

    PUT：这个方法比较少见。HTML表单也不支持这个。本质上来讲，PUT和POST极为相似，都是向服务器发送数据。
    但它们之间有一个重要区别，PUT通常指定了资源的存放位置，而POST则没有，POST的数据存放位置由服务器自己决定。

    举个例子：如一个用于提交博文的URL，/addBlog。
    如果用PUT，则提交的URL会是像这样的”/addBlog/abc123”，其中abc123就是这个博文的地址。
    而如果用POST，则这个地址会在提交后由服务器告知客户端。目前大部分博客都是这样的。
    显然，PUT和POST用途是不一样的。具体用哪个还取决于当前的业务场景

    而patch和put之间也存在区别，是对PUT方法的补充，用来对已知资源进行局部更新。
    所谓的局部更新：
    假设我们有一个UserInfo，里面有userId， userName， userGender等10个字段。
    可你的编辑功能因为需求，在某个特别的页面里只能修改userName，这时候的更新怎么做？

    人们通常(为徒省事)把一个包含了修改后userName的完整userInfo对象传给后端，做完整更新。
    但仔细想想，这种做法感觉有点二，而且真心浪费带宽(纯技术上讲，你不关心带宽那是你土豪)。

    于是patch诞生，只传一个userName到指定资源去，表示该请求是一个局部更新，后端仅更新接收到的字段。

    而put虽然也是更新资源，但要求前端提供的一定是一个完整的资源对象，理论上说，如果你用了put，
    但却没有提供完整的UserInfo，那么缺了的那些字段应该被清空。
*/