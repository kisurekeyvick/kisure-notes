/** 
 * 小程序page页面其中的方法
 */
Page({
    data: {
        // 初始化页面数据
    },
    onLoad: function(options){
        // 生命周期回调—监听页面加载
    },
    onShow: function(){
        // 生命周期回调—监听页面显示
    },
    onReady: function(){
        // 生命周期回调—监听页面初次渲染完成
    },
    onHide: function(){
        // 生命周期回调—监听页面隐藏
    },
    onUnload: function(){
        // 生命周期回调—监听页面卸载
    },
    onPullDownRefresh: function(){
        // 监听用户下拉动作
        /** 
            可以通过wx.startPullDownRefresh触发下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。
            当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。
         */
    },
    onReachBottom: function(){
        // 页面上拉触底事件的处理函数
        /** 
            可以在app.json的window选项中或页面配置中设置触发距离onReachBottomDistance。
            在触发距离内滑动期间，本事件只会被触发一次。
         */
    },
    onShareAppMessage: function(res){
        // 用户点击右上角转发
        /** 
            监听用户点击页面内转发按钮（<button> 组件 open-type="share"）或右上角菜单“转发”按钮的行为，并自定义转发内容。
            注意：只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮
         */
        if (res.from === 'button') {
            // 来自页面内转发内容
            /** 
             * from存在2个值，一个是button,一个是menu
             * button：页面内转发按钮；
             * menu：右上角转发菜单
             */
        }

        return {
            title: '自定义标题',
            path: '路径'
        };
    },
    onPageScroll: function(){
        // 页面滚动触发事件的处理函数
        /*
            注意：请只在需要的时候才在 page 中定义此方法，不要定义空方法。以减少不必要的事件派发对渲染层-逻辑层通信的影响。 
            注意：请避免在 onPageScroll 中过于频繁的执行 setData 等引起逻辑层-渲染层通信的操作。尤其是每次传输大量数据，会影响通信耗时。
        */
    },
    onResize: function(){
        // 页面尺寸改变时触发，详见 响应显示区域变化
    },
    onTabItemTap: function(){
        // 当前是 tab 页时，点击 tab 时触发
    }
});
