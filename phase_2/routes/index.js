const KoaRouter = require('koa-router');
const router = new KoaRouter();

// 请求主页 ---- Http
router.get("/", async (ctx) => { //路由
    //render就是app.js里配置的render
    //这一行代码的意思是 等待（await）渲染views目录下的index.html文件
    await ctx.render('index');  //
});

// 请求用户注册页面
router.get("/signUp", async (ctx) => { //路由
    //render就是app.js里配置的render
    //这一行代码的意思是 等待（await）渲染views目录下的index.html文件
    await ctx.render('/signUpIn/sign_up', {
        layout: 'layouts/layout_login'
    });  //
});

// 登录
router.get("/signIn", async (ctx) => { //路由
    //render就是app.js里配置的render
    //这一行代码的意思是 等待（await）渲染views目录下的index.html文件
    await ctx.render('/signUpIn/sign_In', {
        layout: 'layouts/layout_login'
    });  //
});

// post请求，可接收前端提交的数据
router.post("/", async (ctx) => {
    const title = ctx.request.body.title;
    console.log(title);
});

// 将此模块暴露出去，只有暴露出去外界才能使用它
module.exports = router;



