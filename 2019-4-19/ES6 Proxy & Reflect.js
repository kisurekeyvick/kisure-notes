/**
 * https://mp.weixin.qq.com/s/CgTuEkPoRFgDjI3hTEmniw
 * https://blog.csdn.net/doy_doy/article/details/80513467
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 * 
 * Vue中的数据绑定
 */

/**
 * 关键字是Object.defineProperty：
 * Object.defineProperty()方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象
 * 
 * Object.defineProperty()存在两种属性描述：
 * (1)数据描述符（简略介绍）
        configurable：数据可改变
        enumerable：可枚举
        value：属性值
        writable：可读写

 * (2)存取描述符(get/set)
 */

/**
 * ES5 getter/setter
 */
// 首先，建立一个英雄（Hero）对象并赋予其一些属性
let hero = {
    name:'赵云',
    hp: 100,
    sp: 100
};
// 然后使用Object.defineProperty()来对其具有的一些属性进行修改，并且在控制台输出修改的内容：
Object.defineProperty(hero, 'hp', {
    set (val) {
      console.log(`Set hp to ${val}`);
      return val;
    }}
);
  
hero.hp = '200';// --> Set hp to 200

//  由此，我们可以看到对象的属性变化可以依靠get()和set()方法去追踪和改变；但对于数组则需要使用value()方法实现
let heroTwo = {
    name:'赵云',
    hp: 100,
    sp: 100,
    equipment:['马','长枪']
};

Object.defineProperty(heroTwo.name, 'push', {
    // value() {
    //     console.log('添加数据');
    //     console.log('argument', arguments[0]);
    //     this[this.length] = arguments[0];
    // },
    get() {
        console.log(`get方法，返回${value}`);
        return value;
    },
    set(val) {
        console.log(`获取到对应的值${val}`);
        return val;
    }
});

/**
    对象的本质可以理解为属性的集合，对象的属性包括
        命名属性 : 可直接通过“.”访问到的属性
        数据属性 : 专门保存一个值的属性
        访问器属性 : 保护数据属性的特殊属性
        内部属性 :  不能通过“.”直接访问的属性  （比如 :  class   __proto__）

    (1)数据属性: 专门存储数据的属性
        value : 值,
        writable : true/false, （默认false）
        enumerable : true/false,（默认false）
        configurable : true/false   （默认false） 

    (2)访问器属性: 专门保护数据属性的特殊属性，不实际存储数据(get/set)
 */

/**
 * defineProperty的使用方式：
 * Object.defineProperty(heroTwo.equipment, 'push', {
        value: 属性的值
        writable: 属性的值是否可被重写（默认为false）
        configurable: 总开关，是否可配置，若为false, 则其他都为false（默认为false）
        enumerable: 属性是否可被枚举（默认为false）
        get: 获取该属性的值时调用
        set: 重写该属性的值时调用
 * })

    注意点：
    (1) 使用Object.defineProperty(target, props, {value: ....})添加的属性，其中3大特性默认值都是false。
        四大特性：
        value : 值,
        writable : true/false, （默认false）
        enumerable : true/false,（默认false）
        configurable : true/false   （默认false） 

        例如：Object.defineProperty(heroTwo, 'app', {value:'good'});
              heroTwo.app = 'change';
              console.log(heroTwo);     // good

    (2) 非Object.defineProperty定义的属性，三大特性默认值都是true
        例如：heroTwo.app = 'change';   // 值会改变的

    (3) 访问器属性: 专门保护数据属性的特殊属性，不实际存储数据
        getter/setter访问器: 
            1.get方法负责读取变量的值
            2. set方法负责修改变量的值
        
    (4)如果一个描述符同时有(value或writable)和(get或set)关键字，将会产生一个异常
        意思大概就是不可能定一个属性即可以对它进行正常读写，又可以在它上面架设一层getter/setter来进行访问改写

    (5)如果一个描述符不具有value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。
 */

/**
 * Proxy
 * Proxy意思为“代理”，即在访问对象之前建立一道“拦截”，
 * 任何访问该对象的操作之前都会通过这道“拦截”，即执行Proxy里面定义的方法
 * 
 * let pro = new Proxy(target,handler);
    new Proxy()     表示生成一个Proxy实例
    target          参数表示所要拦截的目标对象
    handler         参数也是一个对象，用来定制拦截行为。
 */

/**
 * handler
   Proxy支持13种拦截行为（handle），针对解决上一节的问题，简单介绍下其中2种拦截行为，get与set。

   (1)get
        get(target, propKey, receiver)
        用于拦截某个属性的读取操作，可以接受三个参数:
            target：目标对象
            propKey：属性名
            receiver（可选）：proxy 实例本身（严格地说，是操作行为所针对的对象）

   (2)set
        set(target, propKey, value, receiver)
        用于拦截某个属性的赋值操作，可以接受四个参数：
            target：目标对象
            propKey：属性名
            value：属性值
            receiver（可选）：Proxy 实例本身
 */
// 案例
let heroThree = {
    name: 'kisure',
    age: 25,
    skill: ['js', 'css', 'html']
};

let handler = {
    get(target, props, receiver){
        /**
         * target === heroThree   
         * props => name属性
         * receiver === heroProxy
         */
        /**
         * 如果我们使用Reflect，则可以这样写：return target[props];
         */
        return Reflect.get(target, props, receiver);
    },
    set(target,props, value, receiver) {
        console.log('触发set')
        /**
         * target === heroThree
         * props => name属性
         * value => 改变name属性的值
         * receiver === heroProxy
         */
        if (Object.prototype.toString.call(value) === '[object String]') {
            value = `string value:${value}`;
        }

        /**
         * 如果我们不使用Reflect的话
         * 则需要使用：
            target[props] = value;
            return true;
            注意，set必须有返回值
         */
        // target[props] = value;
        // return true;
        return Reflect.set(target,props, value, receiver);
    }
};

let heroProxy = new Proxy(heroThree, handler);

console.log(heroProxy.name);
heroProxy.name = 'kis';

let heroSkillProxy = new Proxy(heroProxy.skill, handler);
heroSkillProxy.push('ts');
/**
 * heroSkillProxy.push('ts'); 这一步会触发2次
 * 因为：原因是push即修改了heroThree.skill的内容，又修改了heroThree.skill的length。
 */

/**
 * Reflect
 * 
 * 基本特点：
 * 只要Proxy对象具有的代理方法，Reflect对象全部具有，以静态方法的形式存在。
 * 这些方法能够执行默认行为，无论Proxy怎么修改默认行为，总是可以通过Reflect对应的方法获取默认行为。
 * 
 * 修改某些Object方法的返回结果，让其变得更合理。
 * 比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，
 * 而Reflect.defineProperty(obj, name, desc)则会返回false。
 * 
 * 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，
 * 而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
 * 例如： Reflect.has(heroThree, 'name')    // 判断对象中是否存在name属性  存在返回true，否则返回false
 */
let test = {name: '123'};

try {
    // Object.defineProperty(test.skill, 'apple', {
    //     set(value) {
    //         return value;
    //     }
    // });
    const result = Reflect.defineProperty(test, 'name', {
        writable: false,
        set(value) {
            return value;
        }
    });

    console.log(result);
} catch (error) {
    console.log(`error:${error}`);
}

test.name = '123';