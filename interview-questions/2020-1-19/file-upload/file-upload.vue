<script>
export default {
  /** 
   * https://mp.weixin.qq.com/s/MOkWdKdlayZfrRrN_HkFtg
   * 请你实现一个大文件上传和断点续传
   */
  /** 
   * 大文件上传 - 前端
   * 
   * 前端大文件上传网上的大部分文章已经给出了解决方案，核心是利用 Blob.prototype.slice 方法，
   * 此方法和数组的 slice 方法相似，调用的 slice 方法可以返回原文件的某个切片。
   * 
   * 这样我们就可以根据预先设置好的切片最大数量将文件切分为一个个切片，然后借助 http 的可并发性，
   * 同时上传多个切片，这样从原本传一个大文件，变成了同时传多个小的文件切片，可以大大减少上传时间。
   * 
   * 另外由于是并发，传输到服务端的顺序可能会发生变化，所以我们还需要给每个切片记录顺序。
   */

  /**
   * 上传切片
   * 
   * 分为2个步骤：(1) 对文件进行切片  (2) 将切片传输给服务端
   */

  /** 
   * 显示上传进度条
   * 
   * XMLHttpRequest 原生支持上传进度的监听，只需要监听 upload.onprogress 即可，
   * 我们在原来的 request 基础上传入 onProgress 参数，给 XMLHttpRequest 注册监听事件：
   */

  /** 
   * 断点续传
   * 
   * 断点续传的原理在于前端/服务端需要记住已上传的切片，这样下次上传就可以跳过之前已上传的部分，
   * 有两种方案实现记忆的功能：
   * (1) 前端使用 localStorage 记录已上传的切片 hash。
   * (2) 服务端保存已上传的切片 hash，前端每次上传前向服务端获取已上传的切片。
   * 
   * 第一种是前端的解决方案，第二种是服务端，而前端方案有一个缺陷，如果换了个浏览器就失去了记忆的效果，所以这里选取后者。
   */
}
</script>
<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <el-button @click="handleUpload">上传</el-button>
  </div>
</template>

<script>
  const LENGTH = 10; // 切片数量
  export default {
      data: () => ({
              container: {
                  file: null,
                  data: []
              }
          }),
      computed: {
        uploadPercentage() {
          if (!this.container.file || !this.data.length) {
            return 0;
          }

          const loaded = this.data.map(item => {
            return item.size * item.percentage;
          }).reduce((acc, cur) => acc + cur);

          return parseInt((loaded / this.container.file.size).toFixed(2));
        }
      },    
      methods: {
          request() {},
          handleFileChange() {},
          // 生成文件切片
          createFileChunk(file, length = LENGTH) {
              const fileChunkList = [];
              const chunkSize = Math.ceil(file.size / length);
              let cur = 0;
              while (cur < file.size) {
                  fileChunkList.push({ file: file.slice(cur, cur + chunkSize) });
                  cur += chunkSize;
              }

              return fileChunkList;
          },
          // 上传切片
          async uploadChunks() {
            const requestList = this.data.map(({ chunk }) => {
              const formData = new FormData();
              formData.append("chunk", chunk);
              formData.append("hash", hash);
              formData.append("filename", this.container.file.name); 
              return { formData };
            }).map(async ({ formData }) => this.request({
                url: "http://localhost:3000",
                data: formData,
                onProgress: this.createProgressHandler(this.data[index]),
            }));

            await Promise.all(requestList); // 并发切片
          },
          async handleUpload() {
            if (!this.container.file) {
              return;
            };

            const fileChunkList = this.createFileChunk(this.container.file);

            this.data = fileChunkList.map(({ file }, index) => ({
                chunk: file,
                // 文件名 + 数组下标
                hash: this.container.file.name + "-" + index,
                index,
                percentage:0
            }));

            await this.uploadChunks();
          },
          /** 
           * 每个切片在上传时都会通过监听函数更新 data 数组对应元素的 percentage 属性，
           * 之后把将 data 数组放到视图中展示即可。
           */
          createProgressHandler(item) {
            return e => {
              item.percentage = parseInt(String((e.loaded / e.total) * 100));
            };
          }
      }
  }

  /** 
   * 当点击上传按钮时，调用 createFileChunk 将文件切片，切片数量通过一个常量 Length 控制，这里设置为 10，即将文件分成 10 个切片上传。
   * 
   * createFileChunk 内使用 while 循环和 slice 方法将切片放入 fileChunkList 数组中返回。
   * 
   * 在生成文件切片时，需要给每个切片一个标识作为 hash，这里暂时使用文件名 + 下标，这样后端可以知道当前切片是第几个切片，用于之后的合并切片。
   * 
   * 随后调用 uploadChunks 上传所有的文件切片，将文件切片，切片 hash，以及文件名放入 FormData 中，
   * 再调用上一步的 request 函数返回一个 proimise，最后调用 Promise.all 并发上传所有的切片。
   */
</script>

