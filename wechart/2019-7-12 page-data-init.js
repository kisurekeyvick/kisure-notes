/** 
 * https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html
 * 
 * 微信小程序page初始化data注意事项
 */

/** 
 * data 是页面第一次渲染使用的初始数据。
 * 
 * 页面加载时，data 将会以JSON字符串的形式由逻辑层传至渲染层，
 * 因此data中的数据必须是可以转成JSON的类型：字符串，数字，布尔值，对象，数组。
 * 渲染层可以通过 WXML 对数据进行绑定。
 */

var a = {
    name: '13',
    countPage: ({ totals, pageSize = 10 }) => {
        if (totals) {
            this.totals = totals;
            this.totalPages = Math.ceil(totals / pageSize);
        }
    }
};

var k = JSON.stringify(a)

console.log(k);     // "{"name":"13"}"

