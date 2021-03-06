/** 
 * 关于小程序的behaviors
 * 
 * behaviors 是用于组件间代码共享的特性，类似于一些编程语言中的“mixins”或“traits”。
 * 每个 behavior 可以包含一组属性、数据、生命周期函数和方法，组件引用它时，它的属性、数据和方法会被合并到组件中，生命周期函数也会在对应时机被调用。
 * 每个组件可以引用多个 behavior 。 behavior 也可以引用其他 behavior 。
 * behavior 需要使用 Behavior() 构造器定义。
 */

// 第一步：behavior.js文件中有共享的properties，data，methods等
let SmallFourBeh = Behavior({
    // 共享属性
    properties: {
      name: String,
      type: String
    },
    // 共享数据
    data: {
      selectedName: '',
      selectedType: ''
    },
    // 共享方法
    methods: {
      behaviorTap (name, type) {
        this.setData({
          selectedName:name,
          selectedType: type
        })
      }
    }
});
export { SmallFourBeh }

// 第二步：在movie组件中编写wxml和js
<view>movie:{电影名称:{{ name }},类型：{{ type }}}</view>
<button bind:tap="onTap" data-name="{{ name }}" data-type="{{ type }}">获取数据详情：{{ selectedType }}，{{ selectedName }}</button>

    // 第二步：components/movie/index.js
    import { SmallFourBeh } from '../behavior.js';
    Component({
        /**
         * 组件的属性列表
         */
        behaviors: [SmallFourBeh], //  继承behavior.js里面的properties，data，methods
        properties: {
        },
        methods: {
          onTap (ev) {
            let { name, type } = ev.target.dataset
            this.behaviorTap(name, type) // 通过this可以访问behavior.js里面的内容
          }
        }
    })

// 第三步：在music组件中编写wxml和js
// <!--第三步：components/music/index.wxml-->
<view style='margin-top:36px'>music:{歌曲名称:{{ name }},类型：{{ type }}}</view>
<button bind:tap="onTap" data-name="{{ name }}" data-type="{{ type }}">获取数据详情：{{ selectedType }}，{{ selectedName }}</button>

    // 第三步：components/music/index.js
    import { SmallFourBeh } from '../behavior.js' // 导入behavior.js
    Component({
        /**
         * 组件的属性列表
         */
        behaviors: [SmallFourBeh], //  继承behavior.js里面的properties，data，methods
        properties: {
        },
        methods: {
            onTap(ev) {
                let { name, type } = ev.target.dataset
                this.behaviorTap(name, type) // 通过this可以访问behavior.js里面的内容
            }
        }
    })
