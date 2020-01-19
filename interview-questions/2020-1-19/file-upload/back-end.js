/** 
 * 简单使用 HTTP 模块搭建服务端
 */
const http = require('http');
const path = require('path');
const fse = require('fs-extra');
const multiparty = require('multiparty');

const server = http.createServer();
// 大文件存储路径
const UPLOAD_DIR = path.resolve(__dirname, '..', 'target');

server.on('request', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.status = 200;
        res.end();
        return;
    }

    const multipart = new multiparty.Form();

    multipart.parse(req, async (err, fields, files) => {
        if (err) {
            return;
        }

        const [chunk] = files.chunk;
        const [hash] = files.hash;
        const [filename] = files.filename;
        const chunkDir = `${UPLOAD_DIR}/${filename}`;

        // 切片目录不存在，创建切片目录
        if (!fse.existsSync(chunkDir)) {
            await fse.mkdirs(chunkDir);
        }

        // fs-extra 专用方法，类似 fs.rename 并且跨平台
        // fs-extra 的 rename 方法 windows 平台会有权限问题
        await fse.move(chunk.path, `${chunkDir}/${hash}`);
        res.end("received file chunk");
    });
});

server.listen(3000, () => console.log('正在监听 3000 端口'));

/** 
 * 查看 multiparty 处理后的 chunk 对象，path 是存储临时文件的路径，size 是临时文件大小，
 * 在 multiparty 文档中提到可以使用 fs.rename(由于我用的是 fs-extra，其 rename 方法在 Windows 系统上存在权限问题，所以换成了 fse.move) 
 * 重命名的方式移动临时文件，也就是文件切片。
 * 
 * 在接受文件切片时，需要先创建存储切片的文件夹，由于前端在发送每个切片时额外携带了唯一值 hash，所以以 hash 作为文件名，
 * 将切片从临时路径移动切片文件夹中，最后的结果如下：[fileChunk.webp]
 */


/** 
 * 合并切片
 */
const resolvePost = req =>
    new Promise(resolve => {
        let chunk = "";
        req.on("data", data => {
        chunk += data;
    });
    req.on("end", () => {
        resolve(JSON.parse(chunk));
    });
});

// 合并切片
const mergeFileChunk = async (filePath, filename) => {
    const chunkDir = `${UPLOAD_DIR}/${filename}`;
    const chunkPaths = await fse.readdir(chunkDir);
    await fse.writeFile(filePath, "");

    chunkPaths.forEach(chunkPath => {
        fse.appendFileSync(filePath, fse.readFileSync(`${chunkDir}/${chunkPath}`));
        fse.unlinkSync(`${chunkDir}/${chunkPath}`);
    });

    fse.rmdirSync(chunkDir); // 合并后删除保存切片的目录
};

server.on('request', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    if (req.method === 'OPTIONS') {
        res.status = 200;
        res.end();
        return;
    }

    if (req.url === '/merge') {
        const data = await resolvePost(req);
        const { filename } = data;
        const filePath = `${UPLOAD_DIR}/${filename}`;
        await mergeFileChunk(filePath, filename);
        res.end(
            JSON.stringify({
                code: 0,
                message: "file merged success"
            })
        );
    }
});

/** 
 * 由于前端在发送合并请求时会携带文件名，服务端根据文件名可以找到上一步创建的切片文件夹。
 * 接着使用 fs.writeFileSync 先创建一个空文件，这个空文件的文件名就是切片文件夹名 + 后缀名组合而成，
 * 随后通过 fs.appendFileSync 从切片文件夹中不断将切片合并到空文件中，每次合并完成后删除这个切片，等所有切片都合并完毕后最后删除切片文件夹。
 */
