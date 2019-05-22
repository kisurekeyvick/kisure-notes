const dom = document.getElementById('nice');
/** 
 * 使用dom进行判断的时候，ts会提示我们 dom的值可能为null,
 * 但是我们知道dom不可能是null的，所以可以写成：const dom = document.getElementById('nice')!;
 * 这样可以明确告诉 TS ，它不会是 null，不过至少，这时候我们清楚的知道自己想做什么。
 */
if (dom) {

}
