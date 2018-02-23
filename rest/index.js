import { ArticleController } from './controller';
import koaRouter from 'koa-router';

const router = koaRouter({
    prefix: '/api/v1',
});

router.get('/articles', ArticleController.index);

export default router;