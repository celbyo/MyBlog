import { ArticleController } from './controller';
import koaRouter from 'koa-router';

const router = koaRouter({
    prefix: '/api/v1',
});

router.get('/articles', ArticleController.index);
router.get('/articles/:id', ArticleController.show);

export default router;