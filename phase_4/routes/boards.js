const KoaRouter = require('koa-router');
const router = new KoaRouter();
const editBoard = require('../lib/board');


// 管理子论坛
router.get("/admin/manageBoards", async (ctx) => {  //路由
	const listBoardPromise = editBoard.listBoardAll();
	const listBoard = await listBoardPromise;
	await ctx.render("/admin/boards", {
		layout: 'layouts/layout_admin',
		listBoard: listBoard
	});
});

// 创建子论坛 ---- post
router.post('/admin/manageBoards', async (ctx) => {
	const newBoardName = ctx.request.body.newBoardName;
	const listBoardPromise = editBoard.listBoardAll();
	const listBoard = await listBoardPromise; //得到的是所有类别子论坛

	let existBoardArray = [];
	listBoard.forEach(board => {
		existBoardArray.push(board.board_name);
	});
	if(existBoardArray.length === 0) {
		await editBoard.addBoard(newBoardName);
		console.log('创建子论坛成功');
		ctx.redirect('/admin/manageBoards');
	} else {
		if(existBoardArray.indexOf(newBoardName) !== -1) {
			console.log('创建失败，该子论坛已存在，请重新创建!');
			ctx.redirect('/admin/manageBoards');
		} else {
			editBoard.addBoard(newBoardName);
			console.log('创建成功');
			ctx.redirect('/admin/manageBoards');
		}
	}
});


module.exports = router;

