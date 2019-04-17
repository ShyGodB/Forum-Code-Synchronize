const KoaRouter = require('koa-router');
const router = new KoaRouter();
const editBoard = require('../lib/board');
const editTopic = require('../lib/topics');


//帖子管理--管理员
router.get("/admin/manageTopics/:id", async (ctx) => {  //路由

	const id = ctx.params.id;

	const listBoardPromise = editBoard.listBoardAll();
	const listBoard = await listBoardPromise;

	const listAllTopicPromise = editTopic.listAllTopic();
	const allTopic = await listAllTopicPromise;

	const listTopicByBoardIdPromise = editTopic.listTopicByBoardId(id)
	const listTopic = await listTopicByBoardIdPromise;

	await ctx.render('/admin/topics', {
		id: id,
		allTopic: allTopic,
		listBoard: listBoard,
		listTopic: listTopic,
		layout: "layouts/layout_admin"
	});
});



module.exports = router;

