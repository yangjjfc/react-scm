import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import Routes from './routes';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import 'element-theme-default';
import './style/common.scss';


const history = createHistory();
const middleware = routerMiddleware(history);


//具体配置查看 https://github.com/reacttraining/react-router/tree/master/packages/react-router-redux
const store = createStore(rootReducer, applyMiddleware(middleware))
ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <div>
            {Routes}
        </div>
    </ConnectedRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
