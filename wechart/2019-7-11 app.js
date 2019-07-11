/** 
 * 小程序 app
 * 
 * App() 必须在 app.js 中调用，必须调用且只能调用一次。不然会出现无法预期的后果。
 * 
 * 参数：
    onLaunch        生命周期回调——监听小程序初始化。
    onShow          生命周期回调——监听小程序启动或切前台。
    onHide          生命周期回调——监听小程序切后台。
    onError         错误监听函数。
    onPageNotFound  页面不存在监听函数
 */
// 案例
App({
    onLaunch(options){
        // 小程序初始化
        // 该功能只会全局触发一次
        // 其参数可以通过：wx.getLaunchOptionsSync来获取
    },
    onShow(options) {
        // 监听小程序启动或者切换至前台
        // 我们在页面中也可以通过：wx.onAppShow 绑定监听
    },
    onHide() {
        // 监听小程序切换至后台
        // 我们可以在页面中通过：wx.onAppHide 绑定监听
    },
    onError() {
        // 监听错误函数
    },
    onPageNotFound(res) {
        // 当小程序打开的页面不存在的时候，会触发，我们也可以使用 wx.onPageNotFound 绑定触发
        wx.redirectTo({
            url: '../../.....'  
        });
        // 需要注意的是，如果要跳转的是tabbar页面，那么我们需要使用 wx.switchTab方法
    }
})

/** 
 * 在page中获取小程序全局唯一的App实例
 */
var appInstance = getApp();
console.log(appInstance.globalData);

/** 
 * 注意点：
 * (1)不要在定义于 App() 内的函数中，或调用 App 前调用 getApp() ，使用 this 就可以拿到 app 实例。
 * (2)通过 getApp() 获取实例之后，不要私自调用生命周期函数。
 */
