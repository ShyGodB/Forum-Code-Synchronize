const KoaRouter = require('koa-router');
const editBoard = require("../lib/board");
const editTopic = require("../lib/topics");
const router = new KoaRouter();


// 请求主页 ---- Http
router.get("/", async (ctx) => { //路由

    const user = ctx.session.user;
    const listBoardPromise = editBoard.listBoardAll();
    const listBoard = await listBoardPromise;

    const listAllTopicPromise = editTopic.listAllTopic();
    const allTopic = await listAllTopicPromise;

    await ctx.render('index', {
        user: user,
        allTopic: allTopic,
        listBoard: listBoard
    });
});




// 将此模块暴露出去，只有暴露出去外界才能使用它
module.exports = router;



