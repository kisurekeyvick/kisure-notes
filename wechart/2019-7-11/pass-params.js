/**
 * https://www.jb51.net/article/132550.htm
 * 
 * 微信小程序传递参数的几种方式
 * 
 * (1)navigator 跳转时
 *      wxml页面（参数多时可用“&”）
 *      <navigator url='../index/index?id=1&name=aaa'></navigator>
 * 
 *      或者添加点击事件，js用navigateTo跳转传参，两种效果一样
 * 
        wx.navigateTo({
            url: '../index/index?id=1&name=aaa',
        })

        传递参数以后，我们可以在对应的跳转页面中的onLoad里面直接取传递过来的参数：
        onLoad: function(options) {}

    (2)全局变量
        app.js页面:
        globalData:{
            id:null
        }

        赋值：
        var app = getApp();
        app.globalData.id = 2

        取值：
        var app = getApp();
        var id = app.globalData.id

    (3)列表index下标取值
        wxml页面
        <button bindtap='clickMe' data-id='1'>点击</button>
        如果需要传递多个，可以写多个data-[参数]的方式进行传递

        js页面：
        clickMe:function(e){
            var id = e.currentTarget.dataset.id
            console.log(id);
        }

        我们需要注意的是：通过wxml设置data-[参数名]传递参数，[参数名]只能是小写，不能有大写

    (4)form表单传值
 */