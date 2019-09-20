/** 
 * https://juejin.im/post/5d5df391e51d453b1e478ad0
 * 
 * 列举了一些比较不常见的Web API
 */

/** 
 * (1) querySelector
 * 
 * 都9102年了，还在用getElementById吗😭
 * 
 * 注意：无论如何只返回一个元素，如果有多个素，那也只返回第一个✅
 */
// 作用在document
document.querySelector("#nav"); // 获取文档中id="nav"的元素
document.querySelector(".nav"); // 获取文档中class="nav"的元素
document.querySelector("#nav li:first-child"); // 获取文档中id="nav"下面的第一个li元素

// 也可以作用在其他元素
let nav = dodocument.querySelector("#nav");
nav.querySelector("li"); // 如果有多个li的话，返回第一个li\

/** 
 * (2) querySelectorAll
 * 
 * 注意：返回的值是一个类数组，可以使用forEach
 * 但是无法使用filter、map等，需要转换一下：Array.from(list).map();
 */

/** 
 * (3) closest
 * 
 * 跟querySelector相反，该元素可以向上查询，也就是可以查询到父元素：
 */
document.querySelector("li").closest("#nav");

/** 
 * (4) dataset
 * 
 * 就跟原生微信小程序一样，能获取标签上以"data-"为前缀的属性集合:
 * 
 * 注意：虽然可以用getAttribute方法获取任何属性值，但是性质却不一样，这是开发规范问题，凡是自定义属性都要加上data-前缀哦✅
 */
// <p data-name="蜘蛛侠" data-age="16"></p>
document.querySelector("p").dataset; // {name: "蜘蛛侠", age: "16"}

/** 
 * (5) URLSearchParams
 * 
 * 假设浏览器的url参数是 "?name=蜘蛛侠&age=16"
 */
new URLSearchParams(location.search).get("name"); // 蜘蛛侠

/** 
 * (6) hidden
 * 
 * 这是一个html属性，规定元素是否隐藏，表现跟css的display: none一致
 */
// <div hidden>我被隐藏了</div>
document.querySelector("div").hidden = true / false;

/** 
 * (7) contenteditable
 * 
 * 可以使一个元素可以被用户编辑：
 * <p contenteditable>我是P元素，但是我也可以被编辑</p>
 */

/** 
 * (8) spellcheck
 * 
 * 也是一个html属性，规定输入的内容是否检查英文的拼写：
 * <!-- 默认就是true，可省略 -->
 * <textarea spellcheck="true"></textarea>
 * 
 * 设置不检查:
 * <textarea spellcheck="false"></textarea>
 */

/** 
 * (9) classList
 * 
 * 这是一个对象，该对象里封装了许多操作元素类名的方法:
 * <p class="title"></p>
 */
let elem = document.querySelector("p");
// 增加类名
elem.classList.add("title-new"); // "title title-new"
// 删除类名
elem.classList.remove("title"); // "title-new"
// 切换类名（有则删、无则增，常用于一些切换操作，如显示/隐藏）
elem.classList.toggle("title"); // "title-new title"
// 替换类名
elem.classList.replace("title", "title-old"); // "title-new title-old"
// 是否包含指定类名
elem.classList.contains("title"); // false

/** 
 * (10) getBoundingClientRect
 * 
 * 可以获取指定元素在当前页面的空间信息
 */
elem.getBoundingClientRect();
/** 
    {
        x: 604.875,
        y: 1312,
        width: 701.625,
        height: 31,
        top: 1312,
        right: 1306.5,
        bottom: 1343,
        left: 604.875
    }
*/

/** 
 * (11) contains
 * 
 * 可以判断指定元素是否包含了指定的子元素：
 */
/** 
    <div>
        <p></p>
    </div>
 */
document.querySelector("div").contains(document.querySelector("p")); // true

/** 
 * (12) online state
 * 
 * 监听当前的网络状态变动，然后执行对应的方法：
 */
window.addEventListener("online", xxx);

window.addEventListener("offline", () => {
  alert("你断网啦！");
});

/** 
 * (13) toDataURL
 * 
 * 这个canvas的API，作用是将画布的内容转换成一个base64的图片地址；
 */
const downloadImage = (url, name) => {
    // 实例化画布
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
  
    // 实例化一个图片对象
    let image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = url;
  
    // 当图片加载完毕
    image.onload = () => {
      // 将图片画在画布上
      canvas.height = image.height;
      canvas.width = image.width;
      context.drawImage(image, 0, 0);
  
      // 将画布的内容转换成base64地址
      let dataURL = canvas.toDataURL("image/png");
  
      // 创建a标签模拟点击进行下载
      let a = document.createElement("a");
      a.hidden = true;
      a.href = dataURL;
      a.download = name;
  
      document.body.appendChild(a);
      a.click();
    }
}

/** 
 * (14) customEvent
 * 
 * 自定义事件，就跟vue里面的on跟emit一样
 */
// 监听自定义事件：
window.addEventListener("follow", event => {
    console.log(event.detail); // 输出 {name: "前端宇宙情报局"}
});

// 派发自定义事件：
window.dispatchEvent(new CustomEvent("follow", {
    detail: {
      name: "前端宇宙情报局"
    }
}));
