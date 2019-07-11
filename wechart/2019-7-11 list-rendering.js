/** 
 * 微信列表渲染
 */

/** 
 * wx:for
 * 
 * 在组件上使用 wx:for 控制属性绑定一个数组，即可使用数组中各项的数据重复渲染该组件
 * 你可以理解为angular的ng-for或者angualrjs的ng-repeat
 * 
 * 默认数组的当前项的下标变量名默认为 index，数组当前项的变量名默认为 item
 * 
    <view wx:for="{{array}}">
        {{index}}: {{item.message}}
    </view>

    Page({
        data: {
            array: [
                { message: 'foo',}, 
                { message: 'bar' }]
        }
    })

    (1)使用 wx:for-item 可以指定数组当前元素的变量名
    (2)使用 wx:for-index 可以指定数组当前下标的变量名
        <view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
            {{idx}}: {{itemName.message}}
        </view>
    (3)wx:for 也可以嵌套，下边是一个九九乘法表
        <view wx:for="{{[1, 2, 3, 4, 5, 6, 7, 8, 9]}}" wx:for-item="i">
            <view wx:for="{{[1, 2, 3, 4, 5, 6, 7, 8, 9]}}" wx:for-item="j">
                <view wx:if="{{i <= j}}">
                    {{i}} * {{j}} = {{i * j}}
                </view>
            </view>
        </view>
 */

/** 
 * block wx:for
 * 
 * 类似 block wx:if，也可以将 wx:for 用在<block/>标签上，以渲染一个包含多节点的结构块。例如:
    <block wx:for="{{[1, 2, 3]}}">
        <view> {{index}}: </view>
        <view> {{item}} </view>
    </block>

    你可以理解为react的fragment
 */

/** 
 * wx:key
 * 
 * 如果列表中项目的位置会动态改变或者有新的项目添加到列表中，并且希望列表中的项目保持自己的特征和状态
 * 需要使用 wx:key 来指定列表中项目的唯一的标识符
 * 
 * 其中wx:key 的值以两种形式提供：
 * (1) 字符串，代表在 for 循环的 array 中 item 的某个 property，
 *      该 property 的值需要是列表中唯一的字符串或数字，且不能动态改变。
 * (2) 保留关键字 *this 代表在 for 循环中的 item 本身，这种表示需要 item 本身是一个唯一的字符串或者数字。
    
    Page({
        data: {
            objectArray: [
            {id: 5, unique: 'unique_5'},
            {id: 4, unique: 'unique_4'},
            {id: 3, unique: 'unique_3'},
            {id: 2, unique: 'unique_2'},
            {id: 1, unique: 'unique_1'},
            {id: 0, unique: 'unique_0'},
            ],
            numberArray: [1, 2, 3, 4]
        },
        ....
    })

    <switch wx:for="{{objectArray}}" wx:key="unique" style="display: block;"> {{item.id}} </switch>
    <switch wx:for="{{numberArray}}" wx:key="*this" style="display: block;"> {{item}} </switch>
 */

/** 
 * 注意点：
 * (1) 当 wx:for 的值为字符串时，会将字符串解析成字符串数组
        <view wx:for="array">
            {{item}}
        </view>

        等同于：

        <view wx:for="{{['a','r','r','a','y']}}">
            {{item}}
        </view>
 * 
 * (2) 花括号和引号之间如果有空格，将最终被解析成为字符串
        <view wx:for="{{[1,2,3]}} ">
            {{item}}
        </view>

        等同于：

        <view wx:for="{{[1,2,3] + ' '}}" >
            {{item}}
        </view>

        最终解析成：
        <view>1</view>
        <view>,</view>
        <view>2</view>
        <view>,</view>
        <view>3</view>
        <view> </view>
 */


