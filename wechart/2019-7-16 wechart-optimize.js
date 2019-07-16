/** 
 * https://juejin.im/post/5b8fd1416fb9a05cf3710690#heading-39
 * 
 * 性能优化
 */

/** 
 * 加载优化
 * 
 * 代码包的大小是最直接影响小程序加载启动速度的因素。代码包越大不仅下载速度时间长，
 * 业务代码注入时间也会变长。所以最好的优化方式就是减少代码包的大小。
 * 
 * 四种方式：
 * (1) 代码压缩
 * (2) 及时清理无用代码和资源文件
 * (3) 减少代码包中的图片等资源文件的大小和数量
 * (4) 分包加载
 */

/**
 * 首屏加载的体验优化建议
 * 
 * 提前请求: 异步数据请求不需要等待页面渲染完成。
 * 利用缓存: 利用 storage API 对异步请求数据进行缓存，二次启动时先利用缓存数据渲染页面，在进行后台更新。
 * 避免白屏：先展示页面骨架页和基础内容。
 * 及时反馈：即时地对需要用户等待的交互操作给出反馈，避免用户以为小程序无响应。
 */

/** 
 * 分包加载优化
 * 
                        主包                    // 启动时加载
                分包A    分包B    分包C          // 按需加载
 * 
 * 在构建小程序分包项目时，构建会输出一个或多个功能的分包，其中每个分包小程序必定含有一个主包，
 * 所谓的主包，即放置默认启动页面/TabBar 页面，
 * 以及一些所有分包都需用到公共资源/JS 脚本，而分包则是根据开发者的配置进行划分。
 * 
 * 优点：
 * 对开发者而言，能使小程序有更大的代码体积，承载更多的功能与服务
 * 对用户而言，可以更快地打开小程序，同时在不影响启动速度前提下使用更多功能
 * 
 * 限制：
 * 整个小程序所有分包大小不超过 8M
 * 单个分包/主包大小不能超过 2M
 */

/** 
 * 原生分包加载的配置：
 * 
    ├── app.js
    ├── app.json
    ├── app.wxss
    ├── packageA
    │   └── pages
    │       ├── cat
    │       └── dog
    ├── packageB
    │   └── pages
    │       ├── apple
    │       └── banana
    ├── pages
    │   ├── index
    │   └── logs
    └── utils
 * 
    开发者通过在 app.json subPackages 字段声明项目分包结构：

    {
        "pages":[
            "pages/index",
            "pages/logs"
        ],
        "subPackages": [
            {
                "root": "packageA",
                "pages": [
                    "pages/cat",
                    "pages/dog"
                ]
            },
            {
                "root": "packageB",
                "pages": [
                    "pages/apple",
                    "pages/banana"
                ]
            }
        ]
    }

    分包原则：
    (1) 声明 subPackages 后，将按 subPackages 配置路径进行打包，
            subPackages 配置路径外的目录将被打包到 app（主包） 中

    (2) subPackage 的根目录不能是另外一个 subPackage 内的子目录

    (3) 首页的 TAB 页面必须在 app（主包）内

    引用原则:
    (1) packageA 无法 require packageB JS 文件，但可以 require app、
            自己 package 内的 JS 文件

    (2) packageA 无法 import packageB 的 template，但可以 require app、
            自己 package 内的 template

    (3) packageA 无法使用 packageB 的资源，但可以使用 app、自己 package 内的资源
 */

/**
 * 渲染性能优化
 * 
 * (1) 每次 setData 的调用都是一次进程间通信过程，通信开销与 setData 的数据量正相关。
 * (2) setData 会引发视图层页面内容的更新，这一耗时操作一定时间中会阻塞用户交互。
 * (3) setData 是小程序开发使用最频繁，也是最容易引发性能问题的。
 * 
 * 避免不当使用 setData:
 * (1) 使用 data 在方法间共享数据，可能增加 setData 传输的数据量。。data 应仅包括与页面渲染相关的数据
 * (2) 使用 setData 传输大量数据，**通讯耗时与数据正相关，页面更新延迟可能造成页面更新开销增加。**
 *      仅传输页面中发生变化的数据，使用 setData 的特殊 key 实现局部更新
 * (3) 短时间内频繁调用 setData，**操作卡顿，交互延迟，阻塞通信，页面渲染延迟。**
 *      避免不必要的 setData，对连续的setData调用进行合并。
 */

/** 
 * 避免不当使用onPageScroll
 * 
 * (1) 只在有必要的时候监听 pageScroll 事件。不监听，则不会派发。
 * (2) 避免在 onPageScroll 中执行复杂逻辑
 * (3) 避免在 onPageScroll 中频繁调用 setData
 * (4) 避免滑动时频繁查询节点信息（SelectQuery）用以判断是否显示
 *      部分场景建议使用节点布局橡胶状态监听（inersectionObserver）替代。
 */
