/** 
 * 关于formData
 * https://www.jianshu.com/p/e984c3619019
 */

/**
 * formData的主要用途有两个：
 * (1)将form表单元素的name和value进行组合，实现表单数据的序列化，从而减少表单元素的拼接，提高工作效率。
 * (2)异步上传文件
 */

/** 
 * 1.创建一个空对象
 */
/** 
 * 1.1 创建一个空对象
 */
// 通过FormData构造函数创建一个空对象
const formData = new FormData();
// 可以通过append()方法来追加数据
formData.append('name', 'kisure');
// 通过get方法对值进行读取
console.log(formData.get('name'));
// 通过set方法对值进行设置
formData.set('name', 'nice');
console.log(formdata.get('name'));

/** 
 * 1.2 通过表单对formData进行初始化
 */
/** 
    <form id="advForm">
        <p>广告名称：<input type="text" name="advName"  value="xixi"></p>
        <p>广告类别：<select name="advType">
            <option value="1">轮播图</option>
            <option value="2">轮播图底部广告</option>
            <option value="3">热门回收广告</option>
            <option value="4">优品精选广告</option>
        </select></p>
        <p><input type="button" id="btn" value="添加"></p>
    </form>
*/
// 通过表单元素作为参数，实现对formData的初始化
const btn = document.getElementById('#btn');
btn.onclick = function() {
    //根据ID获得页面当中的form表单元素
    const form = document.querySelector('#advForm');
    //将获得的表单元素作为参数，对formData进行初始化
    const formdata = new FormData(form);
    //通过get方法获得name为advName元素的value值
    console.log(formdata.get("advName"));
    //通过get方法获得name为advType元素的value值
    console.log(formdata.get("advType"));
};

/** 
 * 2 操作方法
 */
/** 
 * 2.1 通过get(key)与getAll(key)来获取相对应的值
 */
// 获取key为age的第一个值
formdata.get("age"); 
 // 获取key为age的所有值，返回值为数组类型
formdata.getAll("age");

/** 
 * 2.2 通过append(key,value)在数据末尾追加数据
 */
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//通过append()方法在末尾追加key为name值为laoliu的数据
formdata.append("name","laoliu");
//通过append()方法在末尾追加key为name值为laoli的数据
formdata.append("name","laoli");
//通过append()方法在末尾追加key为name值为laotie的数据
formdata.append("name","laotie");
//通过get方法读取key为name的第一个值
console.log(formdata.get("name"));//laoliu
//通过getAll方法读取key为name的所有值
console.log(formdata.getAll("name"));//["laoliu", "laoli", "laotie"]

/** 
 * 2.3 通过set(key, value)来设置修改数据
 * key的值不存在，会添加一条数据
 */
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//如果key的值不存在会为数据添加一个key为name值为laoliu的数据
formdata.set("name","laoli");
//通过get方法读取key为name的第一个值
console.log(formdata.get("name"));//laoli

// key的值存在，会修改对应的value值
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//通过append()方法在末尾追加key为name值为laoliu的数据
formdata.append("name","laoliu");
//通过append()方法在末尾追加key为name值为laoliu2的数据
formdata.append("name","laoliu2");
//通过get方法读取key为name的第一个值
console.log(formdata.get("name"));//laoliu
//通过getAll方法读取key为name的所有值
console.log(formdata.getAll("name"));//["laoliu", "laoliu2"]
//将存在的key为name的值修改为laoli
formdata.set("name","laoli");
//通过get方法读取key为name的第一个值
console.log(formdata.get("name"));//laoli
//通过getAll方法读取key为name的所有值
console.log(formdata.getAll("name"));//["laoli"]

/** 
 * 2.4 通过has(key)来判断是否存在对应的key值
 */
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//通过append()方法在末尾追加key为name值为laoliu的数据
formdata.append("name","laoliu");
//判断是否包含key为name的数据
console.log(formdata.has("name"));//true
//判断是否包含key为age的数据
console.log(formdata.has("age"));//false

/** 
 * 2.5 通过delete(key)可以删除数据
 */
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//通过append()方法在末尾追加key为name值为laoliu的数据
formdata.append("name","laoliu");
console.log(formdata.get("name"));//laoliu
//删除key为name的值
formdata.delete("name");
console.log(formdata.get("name"));//null

/** 
 * 3.通过XMLHttpRequest发送数据
 */
/** 
    <form id="advForm">
        <p>广告名称：<input type="text" name="advName" value="xixi"></p>
        <p>广告类别：<select name="advType">
            <option value="1">轮播图</option>
            <option value="2">轮播图底部广告</option>
            <option value="3">热门回收广告</option>
            <option value="4">优品精选广告</option>
        </select></p>
        <p>广告图片：<input type="file" name="advPic"></p>
        <p>广告地址：<input type="text" name="advUrl"></p>
        <p>广告排序：<input type="text" name="orderBy"></p>
        <p><input type="button" id="btn" value="添加"></p>
    </form>
*/
var btn=document.querySelector("#btn");
btn.onclick = () => {
    var formdata=new FormData(document.getElementById("advForm"));
    var xhr=new XMLHttpRequest();
    xhr.open("post","http://127.0.0.1/adv");
    xhr.send(formdata);
    xhr.onload=function(){
        if(xhr.status==200){
            //...
        }
    }
}



/** 
 * 注意点：
 * (1)使用append方法时候，不管formData中是否已经存在一个相同的name值，都会append进去的
 * (2)如果一个formData中存在多个相同的name时候，如果使用set来设置这个name的属性，那么formDat中对应的name只会存在一个
 *      也就是说set完以后，只会存在一个name属性，其他多余的会被干掉
 */
