/**
 * https://juejin.im/post/5d1a9d195188251c03259348
 * 
 * 8 个有用的 JS 技巧
 */

/**
 * (1)确保数组值
 * 
 * 使用 grid ，需要重新创建原始数据，并且每行的列长度可能不匹配，
 * 为了确保不匹配行之间的长度相等，可以使用Array.fill方法。
 */
let array = Array(5).fill('');
console.log(array); // outputs (5) ["", "", "", "", ""]

/** 
 * (2)获取数组唯一值
 * 
 * ES6 提供了从数组中提取惟一值的两种非常简洁的方法。
 */
const cars = [
    'Mazda', 
    'Ford', 
    'Renault', 
    'Opel', 
    'Mazda'
];
const uniqueWithArrayFrom = Array.from(new Set(cars));
console.log(uniqueWithArrayFrom); // outputs ["Mazda", "Ford", "Renault", "Opel"]

const uniqueWithSpreadOperator = [...new Set(cars)];
console.log(uniqueWithSpreadOperator);// outputs ["Mazda", "Ford", "Renault", "Opel"]

/** 
 * (3)使用展开运算符合并对象和对象数组
 * 
 * 对象合并是很常见的事情，我们可以使用新的ES6特性来更好，更简洁的处理合并的过程
 */
const product = { name: 'Milk', packaging: 'Plastic', price: '5$' };
const manufacturer = { name: 'Company Name', address: 'The Company Address' };
const productManufacturer = { ...product, ...manufacturer };
console.log(productManufacturer);
// { name: "Company Name", packaging: "Plastic", price: "5$", address: "The Company Address" }

const cities = [
    { name: 'Paris', visited: 'no' },
    { name: 'Lyon', visited: 'no' },
    { name: 'Marseille', visited: 'yes' },
    { name: 'Rome', visited: 'yes' },
    { name: 'Milan', visited: 'no' },
    { name: 'Palermo', visited: 'yes' },
    { name: 'Genoa', visited: 'yes' },
    { name: 'Berlin', visited: 'no' },
    { name: 'Hamburg', visited: 'yes' },
    { name: 'New York', visited: 'yes' }
];
const result = cities.reduce((accumulator, item) => {
    return {
      ...accumulator,
      [item.name]: item.visited
    }
}, {});
console.log(result);
/*
    Berlin: "no"
    Genoa: "yes"
    Hamburg: "yes"
    Lyon: "no"
    Marseille: "yes"
    Milan: "no"
    New York: "yes"
    Palermo: "yes"
    Paris: "no"
    Rome: "yes"
*/

/**
 * (4)数组 map 的方法 (不使用Array.Map)
 * 
 * Array.from 还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
 */
const cities = [
    { name: 'Paris', visited: 'no' },
    { name: 'Lyon', visited: 'no' },
    { name: 'Marseille', visited: 'yes' },
    { name: 'Rome', visited: 'yes' },
    { name: 'Milan', visited: 'no' },
    { name: 'Palermo', visited: 'yes' },
    { name: 'Genoa', visited: 'yes' },
    { name: 'Berlin', visited: 'no' },
    { name: 'Hamburg', visited: 'yes' },
    { name: 'New York', visited: 'yes' }
];
const cityNames = Array.from(cities, ({ name}) => name);
console.log(cityNames);

/** 
 * (5)有条件的对象属性
 * 
 * 不再需要根据一个条件创建两个不同的对象，可以使用展开运算符号来处理
 */
const getUser = (emailIncluded) => {
    return {
      name: 'John',
      surname: 'Doe',
      ...emailIncluded && { email : 'john@doe.com' }
    }
}
  
const user = getUser(true);
console.log(user); // outputs { name: "John", surname: "Doe", email: "john@doe.com" }

const userWithoutEmail = getUser(false);
console.log(userWithoutEmail); // outputs { name: "John", surname: "Doe" }

/** 
 * (6)解构原始数据
 * 
 * 有时候一个对象包含很多属性，而我们只需要其中的几个，这里可以使用解构方式来提取我们需要的属性。
 */
const rawUser = {
    name: 'John',
    surname: 'Doe',
    email: 'john@doe.com',
    displayName: 'SuperCoolJohn',
    joined: '2016-05-05',
    image: 'path-to-the-image',
    followers: 45
};

let user = {}, userDetails = {};
({ name: user.name, surname: user.surname, ...userDetails } = rawUser);

console.log(user); // outputs { name: "John", surname: "Doe" }
console.log(userDetails); // outputs { email: "john@doe.com", displayName: "SuperCoolJohn", joined: "2016-05-05", image: "path-to-the-image", followers: 45 }

/** 
 * (7)动态属性名
 * 
 * 早期，如果属性名需要是动态的，我们首先必须声明一个对象，然后分配一个属性。
 * 有了ES6特性，我们可以做到这一点。
 */
const dynamic = 'email';
let user = {
    name: 'John',
    [dynamic]: 'john@doe.com'
}
console.log(user); // outputs { name: "John", email: "john@doe.com" }

/**
 * (8)字符串插值
 * 
 * 在用例中，如果正在构建一个基于模板的helper组件，那么这一点就会非常突出，它使动态模板连接容易得多。
 */
const user = {
    name: 'John',
    surname: 'Doe',
    details: {
      email: 'john@doe.com',
      displayName: 'SuperCoolJohn',
      joined: '2016-05-05',
      image: 'path-to-the-image',
      followers: 45
    }
}
  
const printUserInfo = (user) => { 
    const text = `The user is ${user.name} ${user.surname}. Email: ${user.details.email}. Display Name: ${user.details.displayName}. ${user.name} has ${user.details.followers} followers.`
    console.log(text);
}

printUserInfo(user);
// outputs 'The user is John Doe. Email: john@doe.com. Display Name: SuperCoolJohn. John has 45 followers.'
