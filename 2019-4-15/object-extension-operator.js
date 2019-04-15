/**
 * ES6-对象的扩展-对象的扩展运算符
 */
const target = {
	name: 'kisure',
	age: 25,
	sex: 'male'
};

const copy = {...target};

copy.age = 20;

console.log(target.age);

const copyAssign = Object.assign({}, target);

copyAssign.age = 23;

console.log(target.age);

/**
 * 总结：
 * Object.assign({}, ....) 等同于 {....}
 * Object.assign合并以后得到的变量的地址，取决于第一个参数的地址
 */