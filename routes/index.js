const router = require('koa-router')();

router
    //  页面
    .get('/', (ctx) => {
        ctx.body = 'hello world!';
    })

export default router;