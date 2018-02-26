const router = require('koa-router')();

router
    //  页面
    .get('/admin', async (ctx) => {
        await ctx.render('admin');
    })
    .get('/', async (ctx) => {
        await ctx.render('home');
    });

export default router;