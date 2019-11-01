/**
 * https://juejin.im/post/5b09a641f265da0dcd0b674f
 * 
 * 前端存储
 */

/** 
 * 在前端开发当中,有时会因为某些需求,要将一些数据存储在前端本地当中。
 * 
 * 比如说:
 * (1) 为了优化性能,将一些常用的数据存在本地,这样以后需要的时候直接从本地拿,不需要再向后端进行请求.
 * (2) 为了防止CSRF攻击,后端给前端一个token,前端就需要将这个token存在本地.之后每次请求都需要带上这个token.
 * 
 * 这些需求就不油避免的造就一个前端的发展方向--前端存储
 */

/** 
 * 随着前端的不断发展,web Storage(localStorage, sessionStorage)也有了一些不太合适的地方:
 * (1) 随着web应用程序的不断发展,5M的存储大小对于一些大型的web应用程序来说有些不够
 * (2) web Storage只能存储string类型的数据.对于Object类型的数据只能先用JSON.stringify()转换一下在存储.
 */

/**
 * indexedDB的介绍
 * 
 * IndexedDB 是一种使用浏览器存储大量数据的方法.它创造的数据可以被查询，并且可以离线使用. 
 * IndexedDB对于那些需要存储大量数据，或者是需要离线使用的程序是非常有效的解决方法
 * 
 * 
 * indexedDB的概念
 * 
 * 使用IndexedDB，你可以存储或者获取数据，使用一个key索引的。 
 * 你可以在事务(transaction)中完成对数据的修改。和大多数web存储解决方案相同，
 * indexedDB也遵从同源协议(same-origin policy). 所以你只能访问同域中存储的数据，而不能访问其他域的。
 * 
 * IndexedDB 是 WebSQL 数据库的取代品
 */

/** 
 * (1) 创建一个indexedDB数据库
 */
var request = indexedDB.open('myDatabase', 1);

request.addEventListener('success', e => {
   console.log("连接数据库成功");
});

request.addEventListener('error', e => {
    console.log("连接数据库失败");
});

/** 
 * 在上面代码中我们使用indexedDB.open()创建一个indexedDB数据库。
 * open()方法接受可以接受两个参数.第一个是数据库名,第二个是数据库的版本号.同时返回一个IDBOpenDBRequest对象用于操作数据库。
 * 
 * 其中对于open()的第一个参数数据库名,open()会先去查找本地是否已有这个数据库,
 * 如果有则直接将这个数据库返回,如果没有,则先创建这个数据库,再返回.
 * 对于第二个参数版本号,则是一个可选参数,如果不传,默认为1.但如果传入就必须是一个整数.
 * 
 * 在通过对indexedDB.open()方法拿到一个数据库对象IDBOpenDBRequest我们可以通过监听这个对象的success事件和error事件来执行相应的操作.
 */

/** 
 * (2) 创建一个对象仓库
 * 
 * 有了一个数据库之后,我们获取就想要去存储数据了,但是单只有数据库还不够,
 * 我们还需要有对象仓库(object store).对象仓库(object store)是indexedDB数据库的基础,其类似于MySQL中表的概念.
 * 
 * 要创建一个对象仓库必须在upgradeneeded事件中,而upgradeneeded事件只会在版本号更新的时候触发.
 * 这是因为indexedDB API中不允许数据库中的数据仓库在同一版本中发生变化
 */
var request = indexedDB.open('myDatabase', 2);
request.addEventListener('upgradeneeded', e => {
    let db = e.target.result;
    const store = db.createObjectStore('Users', {keyPath: 'userId', autoIncrement: false});
    console.log('store:', store);
});

/**
 * 在上述代码中我们监听upgradeneeded事件,并在这个事件触发时使用createObjectStore()方法创建了一个对象仓库.
 * createObjectStore()方法接受两个参数,第一个是对象仓库的名字,在同一数据库中,
 * 仓库名不能重复.第二个是可选参数.用于指定数据的主键,以及是否自增主键.
 */

/** 
 * (3) 一个数据库事务通常包含了一个序列的对数据库的读/写操作。它的存在包含有以下两个目的:
 * 
 * - 为数据库操作序列提供了一个从失败中恢复到正常状态的方法，同时提供了数据库即使在异常状态下仍能保持一致性的方法。
 * - 当多个应用程序在并发访问数据库时，可以在这些应用程序之间提供一个隔离方法，以防止彼此的操作互相干扰。
 */

/**
 * (4) 并非任意的对数据库的操作序列都是数据库事务。数据库事务拥有以下四个特性，习惯上被称之为ACID特性。
 * 
 * - 原子性：事务作为一个整体被执行，包含在其中的对数据库的操作要么全部被执行，要么都不执行
 * - 一致性：事务应确保数据库的状态从一个一致状态转变为另一个一致状态。一致状态的含义是数据库中的数据应满足完整性约束
 * - 隔离性：多个事务并发执行时，一个事务的执行不应影响其他事务的执行
 * - 持久性：已被提交的事务对数据库的修改应该永久保存在数据库中
 */

/** 
 * 简单来说事务就是用来保证数据库操作要么全部成功,要么全部失败的一个限制.
 * 比如,在修改多条数据时,前面几条已经成功了.,
 * 在中间的某一条是失败了.那么在这时,如果是基于事务的数据库操作,那么这时数据库就应该重置前面数据的修改,
 * 放弃后面的数据修改.直接返回错误,一条数据也不修改.
 */

var request = indexedDB.open('myDatabase', 3);
request.addEventListener('success', e => {
    let db = e.target.result;
    let tx = db.transaction('Users', 'readwrite');
});
/** 
 * 上述代码中我们使用transaction()来创建一个事务.
 * transaction()接受两个参数,第一个是你要操作的对象仓库名称,第二个是你创建的事务模式.
 * 传入 readonly时只能对对象仓库进行读操作,无法写操作.可以传入readwrite进行读写操作.
 */

/** 
 * (5) 操作数据
 * 
 * 现在有了数据库,对象仓库,事务之后我们终于可以存储数据了
 * 
 * - add(): 增加数据。接收一个参数，为需要保存到对象仓库中的对象。
 * - put(): 增加或修改数据。接收一个参数，为需要保存到对象仓库中的对象。
 * - get(): 获取数据。接收一个参数，为需要获取数据的主键值。
 * - delete(): 删除数据。接收一个参数，为需要获取数据的主键值。
 * 
 * add 和 put 的作用类似，区别在于 put 保存数据时，如果该数据的主键在数据库中已经有相同主键的时候，
 * 则会修改数据库中对应主键的对象，而使用 add 保存数据，如果该主键已经存在，则保存失败。
 */
// 添加数据
var request = indexedDB.open('myDatabase', 3);
request.addEventListener('success', e => {
    let db = e.target.result;
    let tx = db.transaction('Users', 'readwrite');
    let store = tx.objectStore('Users');
    // 保存数据
    let reqAdd = store.add({'userId': 1, 'userName': '李白', 'age': 24});
    reqAdd.addEventListener('success', e => {
        console.log('保存成功');
    });
});

// 获取数据
var request = indexedDB.open('myDatabase', 3);
request.addEventListener('success', e => {
    let db = e.target.result;
    let tx = db.transaction('Users','readwrite');
    let store = tx.objectStore('Users');
    // 获取数据
    let reqGet = store.get(1);
    reqGet.addEventListener('success', e => {
        console.log(this.result.userName);    // 李白
    });
});

// 删除数据
var request = indexedDB.open('myDatabase', 3);
request.addEventListener('success', e => {
    let db = e.target.result;
    let tx = db.transaction('Users', 'readwrite');
    let store = tx.objectStore('Users');
    // 删除数据
    let reqDelete = store.delete(1);
    reqDelete.addEventListener('success', e => {
        console.log('删除数据成功'); 
    });
});

// 使用游标
/** 
 * 使用get()方法传入一个主键来获取数据,但是这样只能够获取到一条数据.
 * 如果我们想要获取多条数据了怎么办.我们可以使用游标,来获取一个区间内的数据.
 * 
 * 第一个是范围,范围可以是一个IDBKeyRange对象.用以下方式创建
 */

// boundRange 表示主键值从1到10(包含1和10)的集合。
// 如果第三个参数为true，则表示不包含最小键值1，如果第四参数为true，则表示不包含最大键值10，默认都为false
var boundRange = IDBKeyRange.bound(1, 10, false, false);

// onlyRange 表示由一个主键值的集合。only() 参数则为主键值，整数类型。
var onlyRange = IDBKeyRange.only(1);

// lowerRaneg 表示大于等于1的主键值的集合。
// 第二个参数可选，为true则表示不包含最小主键1，false则包含，默认为false
var lowerRange = IDBKeyRange.lowerBound(1, false);

// upperRange 表示小于等于10的主键值的集合。
// 第二个参数可选，为true则表示不包含最大主键10，false则包含，默认为false
var upperRange = IDBKeyRange.upperBound(10, false);

// 完整例子：
var request = indexedDB.open('myDatabase', 4);

request.addEventListener('success', e => {
    let db = e.target.result;
    let tx = db.transaction('Users','readwrite');
    let store = tx.objectStore('Users');
    let range = IDBKeyRange.bound(1,10);
    let req = store.openCursor(range, 'next');

    req.addEventListener('success', e => {
        
    });
});


