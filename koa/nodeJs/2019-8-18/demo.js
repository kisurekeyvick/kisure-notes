const path = require('path');

const arg = process.argv.splice(2);
const arg_path = process.argv[1];

function readFile(argParams) {
    console.log('kisure', argParams);
    argParams.forEach(i => {
        const pathName = path.join(arg_path, i);
        console.log('pathName', pathName);
    });

    /** 
        kisure [ 'nice', 'fish', 'kisure' ]
        pathName /Users/kisure/Documents/GitHub/kisure-notes/nodeJs/2019-8-18/demo.js/nice
        pathName /Users/kisure/Documents/GitHub/kisure-notes/nodeJs/2019-8-18/demo.js/fish
        pathName /Users/kisure/Documents/GitHub/kisure-notes/nodeJs/2019-8-18/demo.js/kisure
     */
}

readFile(arg);