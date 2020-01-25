/** 
 * nodejs 中的event事件
 */
const event = require('events');
const myEmitter = new event.EventEmitter();

myEmitter.on('kisure', function(msg) {
    console.log(`nice fish ${msg}`);
});

myEmitter.emit('kisure', 'fine thanks');

/**
 * nodejs 中的util 工具库
 * 将原型方法从一个构造函数继承到另一个构造函数。
 */
const util = require('util');
const Person = function(name) {
    this.name = name;
};
util.inherits(Person, event.EventEmitter);

const name_1 = new Person('kisure');
const name_2 = new Person('nice');
const name_3 = new Person('fish');

const person = [name_1, name_2, name_3];
person.forEach(item => {
    item.on('speak', function() {
        console.log(`my name is ${item.name}`);
    });
});

name_1.emit('speak');
name_2.emit('speak');

/** 
 * util的官方案例
 */
function Stream() {
    event.call(this);
}

util.inherits(Stream, event);

Stream.prototype.write = function(data) {
    this.emit('data', data);
};

const stream = new Stream();
stream.on('data', data => {
    console.log(`Received data: ${data}`);
});

stream.emit('data', 'nice fish kisure');

/** 
 * 使用ES6的方式：
 */
const EventEmitter = require('events');

class MyStream extends EventEmitter {
    write(data) {
        this.emit('data', data);
    }
}

const newMyDream = new MyStream();

newMyDream.on('data', data => {
    console.log(`使用ES6的方式进行继承，接收到的数据是:${data}`);
});

newMyDream.write('es6 class kisure');

