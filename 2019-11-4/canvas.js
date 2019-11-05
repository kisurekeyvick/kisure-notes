/** 
 * https://wangdoc.com/webapi/canvas.html
 */

/** 
 * (1) 什么是canvas
 * 
 * <canvas>元素用于生成图像，它本身就像一个画布，JavaScript 通过操作它的 API，在上面生成图像。
 * 它的底层是一个个像素，基本上<canvas>是一个可以用 JavaScript 操作的位图。
 * 
 * - 和svg的区别
 * <canvas>是脚本调用各种方法生成图像，SVG 则是一个 XML 文件，通过各种子元素生成图像。
 * 
 * - 使用时候的注意点
 * 使用 Canvas API 之前，需要在网页里面新建一个<canvas>元素：
 * <canvas id="myCanvas" width="400" height="250">
 *  您的浏览器不支持 Canvas
 * </canvas>
 * 如果浏览器不支持这个 API，就会显示<canvas>标签中间的文字：“您的浏览器不支持 Canvas”。
 * 每个<canvas>元素都有一个对应的CanvasRenderingContext2D对象（上下文对象）。
 */
var canvas = document.getElementById('myCanvas');
// 创建一个绘制环境 2d环境
var ctx = canvas.getContext('2d');
/** 
 * 上面代码中，<canvas>元素节点对象的getContext()方法，返回的就是CanvasRenderingContext2D对象
 * 
 * 注意: Canvas API 需要getContext方法指定参数2d，表示该<canvas>节点生成 2D 的平面图像。
 * 如果参数是webgl，就表示用于生成 3D 的立体图案，这部分属于 WebGL API。
 */

/** 
 * Canvas API：绘制图形
 * 
 * Canvas 画布提供了一个作图的平面空间，该空间的每个点都有自己的坐标。
 * 原点(0, 0)位于图像左上角，x轴的正向是原点向右，y轴的正向是原点向下。
 */

/** 
 * (2) 绘制路径
 */
ctx.beginPath();    // 开始绘制路径
ctx.closePath();    // 结束路径，返回到当前路径的起始点
ctx.moveTo();       // 设置路径的起点，即将一个新路径的起始点移动到(x，y)坐标。
ctx.lineTo();       // 使用直线从当前点连接到(x, y)坐标
ctx.fill();         // 在路径内部填充颜色
ctx.fillStyle();    // 指定路径填充的颜色和样式
ctx.strokeStyle();  // 指定路径线条的颜色和样式

/** 
 * (2.1) 线型
 */
ctx.lineWidth = 3      // 指定线条的宽度，默认为1.0
ctx.lineCap = ''       // 指定线条末端的样式: butt(默认值，末端为矩形)     round(末端为圆形)      square()
ctx.lineJoin = ''      // 指定线段交点的样式：round(交点为扇形)     bevel(交点为三角形底边)     miter(默认值，菱形)
ctx.setLineDash()      // 指定虚线里面线段和间距的长度     

/** 
 * (2.2) 矩形
 */
ctx.rect();            // 绘制矩形路径
ctx.fillRect(x,y,w,h);        // 填充一个矩形其中的参数是：x坐标,y坐标,宽,高
// 清除一个矩形的范围
ctx.clearRect(x,y,w,h);     // 清除画布的范围

