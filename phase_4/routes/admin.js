const KoaRouter = require('koa-router');
const router = new KoaRouter();

// 管理员登录
router.get("/sjdfj2i348u2hafsabjkasjknashqioq2u@ijsdfaf8438478fhjvnvabjnk/admin", async (ctx) => {  //路由
	await ctx.render("/admin/admin", {
		layout: 'layouts/layout_admin'
	});
});

// 管理员登录
router.post('/admin', async (ctx) => {
	const username = ctx.request.body.adminName;
	const password = ctx.request.body.adminPassword;
	if (username === 'admin' && password === 'admin') {
		ctx.redirect('/sjdfj2i348u2hafsabjkasjknashqioq2u@ijsdfaf8438478fhjvnvabjnk/admin');
	} else {
		ctx.body = '登录失败';
	}
});


module.exports = router;

