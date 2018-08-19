# Node.js

感觉以前混迹的一些列后台语言都。。。。，现在Node基本也很少写了，但真的真的很重要，它后面是一套后台的知识体系，写在这里警示自己拿到前端offer之后业余时间一定要加深研究。。。

## Node进程

### nodejs子进程 spawn，exec，execFile和fork的用法和区别？

spawn()是启动一个子进程来执行命令
exec()比spawn()多一个回调函数获知子进程的情况
execFile()启动一个子进程来执行可执行文件
fork()与spawn()很像，不同点在它创建Node的子进程只需要指定需要执行的JS文件即可

### node.js进程间通信

### nodejs中定时器process.nextTick和setImmediate的区别，优先级

setTimeout()精确不够，相对浪费性能

process.nextTick()方法操作相对轻量，每次调用process.nextTick(),只会将回调函数放入队列，下一轮Tick()时候取出执行。回调函数保存在一个数组中

setImmediate是后出现的，和processImmediate十分相似，都是将回调函数延迟执行，保存在链表中。

process.nextTick()优先级高于I/O观察者高于setImmediate()

### node.js内存

## 框架

### 实现一个简单的ejs模版引擎

### 比较Koa2和Koa1的区别，和express的区别？

（1）异步流程控制
Express 采用 callback 来处理异步，Koa v1 采用 generator，Koa v2 采用 async/await。
generator 和 async/await 使用同步的写法来处理异步，明显好于 callback 和 promise，async/await 在语义化上又要比 generator 更强。
（2）错误处理
Express 使用 callback 捕获异常，对于深层次的异常捕获不了，Koa 使用 try catch，能更好地解决异常捕获

## 模块

### events模块（待看）