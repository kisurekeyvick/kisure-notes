// const { node, path, ...args } = process.argv;
// console.log(process.argv);
// console.log("node=" + node);    // 节点
// console.log("path=" + path);    // 路径
// console.log("args=" + args);    // ['nice', 'fish']


// const bf = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
// const str = bf.toString('utf-8');
// console.log('字符串的提示：', str);

// const bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
// console.log(bin);
// const dup = new Buffer(bin.length);
// bin.copy(dup);
// dup[0] = 0x48;
// console.log(bin);
// console.log(dup);
const path = require('path');

const d = path.join('foo/', 'baz/', '../bar'); 
console.log(d);
