import React from 'react';
import { routerRedux, Route } from 'dva/router';
import Home from './routes';

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
    return (
        <ConnectedRouter history={history}>
            <Route path="/admin" component={Home} />
        </ConnectedRouter>
    );
}

export default RouterConfig;