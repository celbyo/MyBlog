const router = require('koa-router')();

router
    //  页面
    .get('/', async (ctx) => {
        await ctx.render('admin');
    })

export default router;