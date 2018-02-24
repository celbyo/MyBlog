import AV from 'leancloud-storage';
import { formatQuery } from '../utils';

class Controller {
    constructor(model) {
        this.model = AV.Object.extend(model)
        this.query = new AV.Query(model);
        this.index = this.index.bind(this);
        this.show = this.show.bind(this);
        this.create = this.create.bind(this);
    }

    async index(ctx) {
        let { ipp = 10, page = 1 } = ctx.request.query;
        const query = this.query;
        page = formatQuery(page);
        ipp = formatQuery(ipp);
        query.limit(ipp);
        query.skip((page - 1) * ipp);
        const objects = await query.find();
        const total = await query.count();
        return ctx.success({ data: { ipp, page, total: +total, objects } });
    }

    async show(ctx) {
        const { id } = ctx.params;
        const query = this.query;
        query.equalTo('id', id);
        try {
            const data = await query.first();
            if (!data) {
                return ctx.error({ msg: `${id} is not found` });
            }
            return ctx.success({ data: data });
        } catch (e) {
            return ctx.error({ msg: 'query error', error: e });
        }
    }

    async create(ctx) {
        const object = new this.model();
        const body = ctx.request.body;
    }
}

export default Controller;