let events = require('events');
let eventEmitter = new events.EventEmitter();

/** 
 * 使用on来监听事件
 */
eventEmitter.on('kisure', function(res) {
    console.log('接收到kisure事件的数据了', res);
});

/** 
 * 使用emit来触发事件
 * 第一个参数是事件名字，第二个参数是数据内容
 */
eventEmitter.emit('kisure', 'nice fish');
