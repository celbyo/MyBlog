import AV from 'leancloud-storage';

const model = 'Tag';

class TagController {
    async index(ctx) {
        const query = new AV.Query(model);
        query.equalTo('status', 'A');
        const objects = await query.find();
        return ctx.success({ data: objects });
    }

    async create(ctx) {
        const { name } = ctx.request.body;
        if (!name) {
            return ctx.error({
                msg: `Field name can't not be null`
            });
        }
        const tag = new AV.Object.extend(model);
        tag.set('name', title);
        tag.set('status', 'A');
        const { id } = await tag.save();
        return ctx.success({ data: { id } });
    }

    async delete(ctx) {
        const { id } = ctx.params;
        const article = AV.Object.createWithoutData(model, id);
        article.set('status', 'B');
        await article.save();
        return ctx.success({ data: {} });
    }
}

export default new TagController();