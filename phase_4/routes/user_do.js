const KoaRouter = require('koa-router');
const router = new KoaRouter();
const editUser = require('../lib/user');
const editBoard = require("../lib/board");
const editTopic = require("../lib/topics");



// 请求用户注册页面
router.get("/signUp", async (ctx) => { //路由
	//render就是app.js里配置的render
	//这一行代码的意思是 等待（await）渲染views目录下的index.html文件
	await ctx.render('/signUpIn/sign_up', {
		layout: 'layouts/layout_signUp'
	});  //
});


// 用户注册 -- 获取用户在form表单中输入的数据，判断是否合乎规则，如果正确则将数据存入数据库
router.post('/signUp', async(ctx) => {
	const postData = ctx.request.body;
	const labelValue = postData.labelValue
	switch(labelValue) {
		case "Username":
			const username = postData.username;
			const getUserByUsernamePromise = editUser.getUserByUsername(username);
			const row1 = await getUserByUsernamePromise;
			if(row1.length !== 0) {
				ctx.body = {msg: "用户名已被占用，请重新输入"};
			} else {
				ctx.body = {msg: "此用户名可以使用"};
			}
			break;
		case "Email address":
			const email = postData.email;
			const getUserByEmailPromise = editUser.getUserByEmail(email);
			const row2 = await getUserByEmailPromise;
			if(row2.length !== 0) {
				ctx.body = {msg: "用邮箱已被占用，请重新输入"};
			} else {
				ctx.body = {msg: "此邮箱可以使用"};
			}
			break;
		case "Sign up":
			const username1 = postData.username;
			const email1 = postData.email;
			const password1 = postData.password;
			const data = [username1, email1, password1];
			const addUserDataPromise = editUser.addUser(data);
			await addUserDataPromise;

			const usersPromise = editUser.getUserByEmail(email1);
			const users = await usersPromise;
			const user = users[0];

			ctx.session.user = user;
			ctx.body = {msg: "注册成功"}

			break;
	}
})




// 登录
router.get("/signIn", async (ctx) => { //路由
	//render就是app.js里配置的render
	//这一行代码的意思是 等待（await）渲染views目录下的index.html文件
	await ctx.render('/signUpIn/sign_In', {
		layout: 'layouts/layout_login'
	});
});

//获取用户在form表单中输入的数据，并将其与数据库中储存的信息进行对比以判断是否允许该用户登录
router.post('/signIn', async(ctx) => {
	const postData = ctx.request.body;
	const email = postData.inputEmail;  //获取用户输入的邮箱地址
	const password = postData.inputPassword;  //获取用户输入的密码
	const data = [email, password];

	const rowsPromise = editUser.userLogin(data);
	const rows = await rowsPromise;

	const usersPromise = editUser.getUserByEmail(email);
	const users = await usersPromise;
	const user = users[0];

	if(rows.length === 0) {
			ctx.body = {msg: "Incorrect username or password."}
	} else {
		ctx.session.user = user;
		ctx.body = {msg: "登录成功"}
	}
});

// 用户退出登录状态
router.get("/signOut", async (ctx) => { //路由
	ctx.session.user = null;
	ctx.redirect('/signIn');
});

// 请求帖子发表页面
router.get("/postTopic", async (ctx) => {  //路由

	const listBoardPromise = editBoard.listBoardAll();
	const listBoard = await listBoardPromise;

	await ctx.render("/topics/post_topic", {
		user: ctx.session.user,
		listBoard: listBoard
	});
});

// 发表帖子
router.post('/postTopic', async (ctx) => {

	const title = ctx.request.body.title;
	const boardId = ctx.request.body.select_current_value;
	const article = ctx.request.body.article;

	const data = [title, article, boardId];

	const addTopicPromise = editTopic.addTopic(data);
	await addTopicPromise;
	ctx.redirect('/');
});


module.exports = router;




