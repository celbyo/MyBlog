import tracer from 'tracer';

const logger = tracer.colorConsole({
    level: 'error',
    format: '{{timestamp}} <{{title}}> {{file}}(#{{line}}): {{message}}',
    file: 'error.log',
    path: __dirname,
});

export default async function (ctx, next) {
    try {
        await next();
    } catch (e) {
        if (!e) {
            return ctx.error({ msg: new Error('未知错误!') });
        }
        if (typeof e === 'string') {
            return ctx.error({ msg: new Error(e) });
        }
        logger.error(e.stack);
        ctx.error({ msg: '服务器错误!', error: e, status: ctx.status });
    }
};
