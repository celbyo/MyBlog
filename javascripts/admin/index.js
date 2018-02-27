import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import router from './router';
import articleModel from './models/article';

const app = dva({
    history: createHistory()
});

app.model(articleModel);

app.router(router);

app.start('#app');