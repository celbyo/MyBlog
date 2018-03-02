import path from 'path';
import fs from 'fs';
import Koa from 'koa';
import views from 'koa-views';
import convert from 'koa-convert';
import logger from 'koa-logger';
import koaBody from 'koa-body';
import staticServer from 'koa-static';
import restRouter from './rest';
import pageRouter from './routes';
import response from './middleware/response';
import errorfilter from './middleware/errorfilter';
import devMiddleware from './middleware/devMiddleware';

// const bodyparser = require('koa-bodyparser')();
const isDev = process.env.NODE_ENV !== 'production';

const app = new Koa();
const AV = require('leancloud-storage');

if (isDev) {
    const config = require('./leanclound.config').default;
    AV.init({
        appId: config.APP_ID,
        appKey: config.APP_KEY,
        masterKey: config.MASTER_KEY,
    });
} else {
    AV.init({
        appId: process.env.LEANCLOUD_APP_ID,
        appKey: process.env.LEANCLOUD_APP_KEY,
        masterKey: process.env.LEANCLOUD_APP_MASTER_KEY,
    });
}

AV.Cloud.useMasterKey();

// webpack
if (isDev) {
    const webpack = require("webpack");
    const webpackConfig = require("./webpack.config.babel");
    const compiler = webpack(webpackConfig);
    app.use(devMiddleware(compiler));
    // log record
    app.use(async (ctx, next) => {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
}

// logger
app.use(convert(logger()));

// static
app.use(staticServer(path.join(__dirname, 'public/')));

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

// add jsWebpack
app.use(async (ctx, next) => {
    ctx.state.jsWebpack = (name) => {
        if (!fs.existsSync('./public/webpack-assets.json')) {
            return;
        }
        const jsMap = require('./public/webpack-assets.json');
        if (!jsMap || !jsMap[name]) {
            return;
        }
        return '/' + path.parse(jsMap[name]['js']).base;
    };
    await next();
});

// middleware
app.use(response);
app.use(errorfilter);

app
    .use(restRouter.routes())
    .use(restRouter.allowedMethods())
    .use(pageRouter.routes())
    .use(pageRouter.allowedMethods());

app.listen(3000);