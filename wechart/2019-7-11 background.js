/**
 * https://www.jianshu.com/p/87f80deea865
 * 
 * 微信小程序中设置背景图片
 */

/** 
 * 开发微信小程序时，不能直接在wxss文件里引用本地图片，
 * 运行时会报错：“本地资源图片无法通过WXSS获取，可以使用网络图片，或者 base64，或者使用<image/>标签。”
 * 
 * 这里主要介绍使用<image/>标签的方法，只需2步：
 * 
 * （1）在wxml文件中添加一个<image/>标签：
    <!--页面根标签-->
    <view class="content">
        <!--pics文件夹下的background.jpg文件-->
        <image class='background' src="../../pics/background.jpg" mode="aspectFill"></image>
        <!--页面其它部分-->
    </view>

    （2）在wxss文件中添加：
    page{
        height:100%;
    }
    .background {
        width: 100%;
        height: 100%;
        position:fixed; 
        background-size:100% 100%;
        z-index: -1;
    }
 */