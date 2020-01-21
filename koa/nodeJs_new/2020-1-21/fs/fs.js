/** 
 * 1.
 * 2. cnpm install mkdirp --save
 * 3. const mkdirp = require('mkdirp');
 * 4. 
 */
const fs = require('fs');
const path = '../../2020-1-20';
const dirArr = [];

fs.readdir(path, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    (function getDir(i) {
        if (data.length === i) {
            console.log('文件数目', dirArr);
            return;
        }

        fs.stat(`${path}/${data[i]}`, (error, stats) => {
            if (stats.isDirectory()) {
                dirArr.push(data[i]);
            }
            getDir(i+1);
        });
    })(0);
});

async function run(n) {
    for(let i = 0; i<n; i++) {
        await say(i);
    }
}

function say(i) {
    return setTimeout(() => {
        console.log(i);
    });
}


