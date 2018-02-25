import { ArticleController, TagController } from './controller';
import koaRouter from 'koa-router';

const router = koaRouter({
    prefix: '/api/v1',
});

router.get('/articles', ArticleController.index);
router.get('/articles/:id', ArticleController.show);
router.post('/articles', ArticleController.create);
router.put('/articles/:id', ArticleController.update);
router.delete('/articles/:id', ArticleController.delete);

router.get('/tags', TagController.index);
router.post('/tags', TagController.create);
router.delete('/tags/:id', TagController.delete);

export default router;