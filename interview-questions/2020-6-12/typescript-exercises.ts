/**
 * https://mp.weixin.qq.com/s/ny_yya50PTJZX-IUERSueA
 * 
 * ts的练习题
 */
/** 题1 */
const users = [
    {
        name: 'kisure',
        age: 27,
        occupation: 'web engineer'
    }
];
// 那么利用 typeof 关键字，配合索引查询，我们也可以轻松取得这个类型。这里 number 的意思就是查找出 users 的所有数字下标对应的值的类型集合。
type IUser = typeof users[number];


/** 题2 */
interface User {
    name: string
    age: number
    occupation: string
}
  
interface Admin {
    name: string
    age: number
    role: string
}

// let persons: User[] /* <- Person[] */ = [
//     {
//       name: "Max Mustermann",
//       age: 25,
//       occupation: "Chimney sweep",
//     },
//     {
//       name: "Jane Doe",
//       age: 32,
//       role: "Administrator",
//     },
// ];

// 本题考查联合类型的使用
type IPerson = User | Admin;
let persons: IPerson[] = [
    {
        name: "Max Mustermann",
        age: 25,
        occupation: "Chimney sweep",
    },
    {
        name: "Jane Doe",
        age: 32,
        role: "Administrator",
    }
];


/** 题3 */
function logPerson(person: IPerson) {
    let additionalInformation: string
    if (person.role) {
      // ❌ 报错 Person 类型中不一定有 role 属性
      additionalInformation = person.role
    } else {
      // ❌ 报错 Person 类型中不一定有 occupation 属性
      additionalInformation = person.occupation
    }
    console.log(
      ` - ${chalk.green(person.name)}, ${person.age}, ${additionalInformation}`,
    )
}

// 本题考查 TypeScript 中的「类型保护」，TypeScript 的程序流分析使得某些判断代码包裹之下的代码中，类型可以被进一步收缩。
function logPerson_2(person: IPerson) {
    let additionalInformation: string
    if ('role' in person) {
        additionalInformation = person.role;
    } else {
        additionalInformation = person.occupation;
    }
}

// 我们也可以改为
// PS: 函数返回值中的 is 推断
function isAdmin(user: IPerson): user is Admin {
    return user.hasOwnProperty("role")
}

function logPerson_3(person: IPerson) {
    let additionalInformation: string
    if (isAdmin(person)) {
      additionalInformation = person.role
    } else {
      additionalInformation = person.occupation
    }
}
