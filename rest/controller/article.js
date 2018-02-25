import AV from 'leancloud-storage';
import { formatQuery } from '../utils';

const model = 'Article';

class ArticleController {
    async index(ctx) {
        let { ipp = 10, page = 1 } = ctx.request.query;
        const query = new AV.Query(model);
        page = formatQuery(page);
        ipp = formatQuery(ipp);
        query.equalTo('status', 'A');
        query.limit(ipp);
        query.skip((page - 1) * ipp);
        const objects = await query.find();
        const total = await query.count();
        return ctx.success({ data: { ipp, page, total: +total, objects } });
    }

    async show(ctx) {
        const { id } = ctx.params;
        const query = new AV.Query(model);
        try {
            const data = await query.get(id);
            if (!data || data.status !== 'A') {
                return ctx.error({ msg: `${id} is not found` });
            }
            return ctx.success({ data: data });
        } catch (e) {
            return ctx.error({ msg: 'query error', error: e });
        }
    }

    async create(ctx) {
        const { title, content, tags } = ctx.request.body;
        if (!title || !content) {
            return ctx.error({
                msg: `Field ${!title ? 'title' : 'content'} can't not be null`
            });
        }
        const article = new AV.Object.extend(model);
        article.set('title', title);
        article.set('content', content);
        article.set('tags', tags);
        article.set('publish_status', '0');
        article.set('status', 'A');
        const { id } = await article.save();
        return ctx.success({ data: { id } });
    }

    async update(ctx) {
        const { id } = ctx.params;
        const { title, content, tags } = ctx.request.body;
        if (!title || !content) {
            return ctx.error({
                msg: `Field ${!title ? 'title' : 'content'} can't not be null`
            });
        }
        const article = AV.Object.createWithoutData(model, id);
        article.set('title', title);
        article.set('content', content);
        article.set('tags', tags);
        try {
            await article.save();
            return ctx.success({ data: {} });
        } catch (e) {
            return ctx.error({ msg: 'update error', error: e });
        }
    }

    async delete(ctx) {
        const { id } = ctx.params;
        const article = AV.Object.createWithoutData(model, id);
        article.set('status', 'B');
        await article.save();
        return ctx.success({ data: {} });
    }
}

export default new ArticleController();