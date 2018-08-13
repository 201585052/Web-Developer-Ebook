# Node.js

感觉以前混迹的一些列后台语言都。。。。，现在Node基本也很少写了，但真的真的很重要，它后面是一套后台的知识体系，写在这里警示自己拿到前端offer之后业余时间一定要加深研究。。。

## Node进程

### nodejs子进程 spawn，exec，execFile和fork的用法和区别？

### nodejs中定时器process.nextTick和setImmediate的区别，优先级

## 框架

### 比较Koa2和Koa1的区别，和express的区别？

（1）异步流程控制
Express 采用 callback 来处理异步，Koa v1 采用 generator，Koa v2 采用 async/await。
generator 和 async/await 使用同步的写法来处理异步，明显好于 callback 和 promise，async/await 在语义化上又要比 generator 更强。
（2）错误处理
Express 使用 callback 捕获异常，对于深层次的异常捕获不了，Koa 使用 try catch，能更好地解决异常捕获