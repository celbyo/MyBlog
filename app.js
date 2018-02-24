import Koa from 'koa';
import views from 'koa-views';

const convert = require('koa-convert');
const logger = require('koa-logger');
// const bodyparser = require('koa-bodyparser')();
const koaBody = require('koa-body');

import restRouter from './rest';
import response from './middleware/response';
import errorfilter from './middleware/errorfilter';

const app = new Koa();
const AV = require('leancloud-storage');
const APP_ID = '1QVqKjjJIw4y55H1zOIMWtKm-gzGzoHsz';
const APP_KEY = 'bjKp3vVsqkMHH3Ck0kFzFey1';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

// logger
app.use(convert(logger()));

// static
app.use(require('koa-static')(__dirname + 'public'));

// parse body
app.use(koaBody({
    formLimit: 1048576,  // 最大1M
    textLimit: 1048576,
    formidable: {
        keepExtensions: true, // 带拓展名上传，否则上传的会是二进制文件而不是图片文件
        onFileBegin(name, file) {
            file.path = __dirname + '/public/images/' + file.name; // 重命名上传文件
        },
        uploadDir: __dirname + '/public/images'
    },  // 输出到images文件夹
    multipart: true,
}));

// set view engine
app.use(views(__dirname + '/views', {
    extension: 'pug',
}));

// log record
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// middleware
app.use(response);
app.use(errorfilter);

app
    .use(restRouter.routes())
    .use(restRouter.allowedMethods());

app.listen(3000);