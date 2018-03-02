import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import router from './router';
import articleModel from './models/articles';
import TagModel from './models/tags';

const app = dva({
    history: createHistory()
});

app.model(articleModel);
app.model(TagModel);

app.router(router);

app.start('#app');
