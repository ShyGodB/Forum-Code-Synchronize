// 引入koa
const Koa = require('koa'); 
//引入koa-json  json ==> 轻量级的交换语言，是一种文本格式。说白了就是让东西更好看一点
const json = require('koa-json');  
// node自带的模块，看名字就知道了----路径的处理都要靠它
const path = require('path'); 
// 引入模版引擎
const render = require('koa-ejs'); 
 // koa-bodyparser ==> 基于co-body的koa主体解析器。支持json，表单和文本类型的主体。后面处理http请求的时候要用
const bodyParser = require('koa-bodyparser');
// 实例化koa
const app = new Koa();
const session = require('koa-session');

const router = require('./routes/index');
const userRouter = require('./routes/user_do');

// 配置使用koa-json
app.use(json());
// 配置使用koa-bodyparser
app.use(bodyParser());



//配置模版引擎
render(app, { // app就是前面实例化的Koa==>  const app = new Koa();
	// 这一行配置的是模版引擎的路径，__dirname:获得当前执行文件所在目录的完整目录名,views 就是之前创建的那个文件夹了
	root: path.join(__dirname, 'views'),
	// 设置默认的模版文件为layouts目录下的layout文件，如果你不指定模版就会使用这个
	layout: 'layouts/layout',
	// 文件格式为html
	viewExt: 'html',
	// cache： 是否缓存编译模版，默认为true，这里设为false，不缓存
	cache: false,
	// 调试标记，默认为false
	debug: false
});


//配置session
app.keys = ['shygodb'];
const CONFIG = {
	key: 'koa:qibingfang',
	maxAge: 86400000,
	autoCommit: true,
	overwrite: true,
	httpOnly: true,
	signed: true,
	rolling: false,
	renew: false,
};
app.use(session(CONFIG, app));


//配置路由模块，注意一定要在后面，因为后面有些配置一定要在路由之前才起作用，所以直接塞到后面就没错了
app.use(router.routes()).use(router.allowedMethods());
app.use(userRouter.routes()).use(userRouter.allowedMethods());


//监听端口
app.listen(3000, async () => {
	console.log("Server is running at http://127.0.0.1:3000")
})
