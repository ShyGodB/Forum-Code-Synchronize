const KoaRouter = require('koa-router');
const router = new KoaRouter();
const editBoard = require('../lib/board');
const editTopic = require('../lib/topics');

// 请求帖子展示页面 ---- Http
router.get("/showTopics/:id", async (ctx) => { //路由

    const user = ctx.session.user;
    const id = ctx.params.id;

    const listBoardPromise = editBoard.listBoardAll();
    const listBoard = await listBoardPromise;

    const listAllTopicPromise = editTopic.listAllTopic();
    const allTopic = await listAllTopicPromise;

    const listTopicByBoardIdPromise = editTopic.listTopicByBoardId(id)
    const listTopic = await listTopicByBoardIdPromise;
    await ctx.render('/topics/show_topics', {
        id: id,
        user: user,
        allTopic: allTopic,
        listTopic: listTopic,
        listBoard: listBoard
    });
});





module.exports = router;

