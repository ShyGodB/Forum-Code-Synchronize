const Koa = require('koa');  // 引包
const app = new Koa();  // 实例化
const multer = require('koa-multer');

app.use(async (ctx) => {  //async表示异步  ctx===context---上下文
	ctx.body = "Hello World";   // ctx.body === 页面内容，这里就是指Hello World
});

app.listen(3000, () => {  //监听本地端口3000
	console.log('Server is running at http://127.0.0.1:3000');
});