export default async function (ctx, next) {
    ctx.error = ({ data, msg, status, error }) => {
        ctx.status = status || 400;
        ctx.body = { code: 1, msg, data, error };
    };

    ctx.success = ({ data, msg = 'SUCCESS' }) => {
        ctx.body = { code: 0, msg, data };
    }

    await next();
};