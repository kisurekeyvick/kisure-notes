/** 
 * https://juejin.im/post/5afcee09518825670961697b
 * 
 * 微信小程序组件的封装
 */

/** 
 * wxml:
 * 
    <view class="wx-popup" hidden="{{flag}}">
        <view class='popup-container'>
            <view class="wx-popup-title">{{title}}</view>
            <view class="wx-popup-con">{{content}}</view>
            <view class="wx-popup-btn">
                <text class="btn-no" bindtap='_error'>{{btn_no}}</text>
                <text class="btn-ok" bindtap='_success'>{{btn_ok}}</text>
            </view>
        </view>
    </view>
 */
// popup.js
Component({
    options: {
      multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
      title: {            // 属性名
        type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
        value: '标题'     // 属性初始值（可选），如果未指定则会根据类型选择一个
      },
      // 弹窗内容
      content: {
        type: String,
        value: '内容'
      },
      // 弹窗取消按钮文字
      btn_no: {
        type: String,
        value: '取消'
      },
      // 弹窗确认按钮文字
      btn_ok: {
        type: String,
        value: '确定'
      } 
    },
  
    /**
     * 组件的初始数据
     */
    data: {
      flag: true,
    },
  
    /**
     * 组件的方法列表
     */
    methods: {
      //隐藏弹框
      hidePopup: function () {
        this.setData({
          flag: !this.data.flag
        })
      },
      //展示弹框
      showPopup () {
        this.setData({
          flag: !this.data.flag
        })
      },
      /*
      * 内部私有方法建议以下划线开头
      * triggerEvent 用于触发事件
      */
      _error () {
        //触发取消回调
        this.triggerEvent("error")
      },
      _success () {
        //触发成功回调
        this.triggerEvent("success");
      }
    }
  });


/** 
 * Component构造器
 * 
 * Component构造器可用于定义组件，调用Component构造器时可以指定组件的属性、数据、方法等。
 */
Component({
    properties:{
        // 组件对外属性，你可以理解为react的props
        type: '',	// 属性的类型
        value: '',	// 属性的初始值
        observe: () => {} // 属性更改时候，响应的函数
    },
    data: {
    // 组件内部的数据，和properties一同用于组件的模板渲染
    },
    methods: {
    // 组件的方法，事件响应函数，任意自定义的方法
    },
    behaviors: [
    // 每一个组件可以引用多个behavior，behavior可以相互引用
    // behaviors用于组件之间代码共享，类似于mixins
    // 
    ],
})

/** 
 * 组件的生命周期：
 * I:当组件刚刚被创建好时候created生命周期被触发，在created中不能调用this.setData，
 *      通常情况下，这个生命周期只应该用于给组件this添加一些自定义的属性。
 * II:在组件完全初始化完毕，进入页面节点树后，attached生命周期被触发，此时this.setData已被初始化为当前值。
 *      这个生命周期很重要，我们组件中大部分初始化的工作都在这个时机中执行的
 * III:当组件离开页面节点树后，detached生命周期被触发。
 *      退出一个页面时，如果组件还在页面节点树中，则detached就会被触发。
 */


/** 
 * 当我们创建好组件以后，需要在对应的page导入组件
 * 
 * 我们在需要调用该组件的地方，找到对应的json文件，然后将对应组件的路径写入usingComponents中去：
 * 例如：
    {
        "navigationBarTitleText": "盛大司机端 - 登录页",
        "usingComponents": {
            "sd-button": "../../components/sd-button/sd-button"
        }
    }
 */

/** 
 * 在page中使用组件
 * 
    <view class="container">
        <view class="userinfo">
            <button bindtap="showPopup"> 点我 </button>
        </view>
        <popup id='popup' 
            title='小组件' 
            content='学会了吗' 
            btn_no='没有' 
            btn_ok='学会了'
            bind:error="clickError"  
            bind:success="clickSuccess">
        </popup>
    </view>
 */
// 配置index.js加上点击事件
const app = getApp()

Page({
  onReady: function () {
    //获得popup组件
    this.popup = this.selectComponent("#popup");
  },

  showPopup() {
    this.popup.showPopup();
  },

  //取消事件
  clickError() {
    console.log('你点击了取消');
    this.popup.hidePopup();
  },
  //确认事件
  clickSuccess() {
    console.log('你点击了确定');
    this.popup.hidePopup();
  }
});

/** 
 * 最后一点，this.triggerEvent
 * 
 * triggerEvent能够帮我们指定事件的名字，detail对象，事件选项，其中
 * 事件的选项有：
 * (1)bubble		事件是否冒泡 	默认为false
 * (2)composed		事件是否能够穿越组件的边界  默认为false
 *                  False 代表事件将只能在引用组件的节点树上触发，不进入其他任何组件	内部
 * (3)capturePhase  事件是否拥有捕获阶段  默认为false
 * 
 * 案例：this.triggerEvent(事件名字, detail对象，事件选项);
 */
