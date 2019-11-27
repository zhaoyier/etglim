import React from 'react';
import loadable from 'react-loadable';
import Loading from 'component/Loading';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from 'layout/App';
import store from 'store';
import { LocaleProvider } from 'antd';
import loginUtil from 'util/login';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import Home from 'page/Home';

import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import 'stylesheet/cantd.less';
import 'stylesheet/app.less';

function getComponentAsync(loader) {
  return loadable({
    loader: () => loader,
    loading: Loading,
    timeout: 10000
  });
}

const Root = () => (
  <Provider {...store}>
    <LocaleProvider locale={zh_CN}>
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route exact path="/login" component={getComponentAsync(import(/* webpackChunkName: "Login" */ 'page/Login'))} />
            {
              loginUtil.isLogin()
                ? (
                  <App>
                    <Switch>
                      <Route exact path="/project/usercenter/account" component={getComponentAsync(import(/* webpackChunkName: "Account" */ 'page/Account'))} />

                      <Route exact path="/project" component={Home} />

                      <Route
                        exact
                        path="/project/list/search"
                        component={getComponentAsync(import(/* webpackChunkName: "SearchList" */ 'page/SearchList'))}
                      />
                      <Redirect exact from="/" to="/project" />
                    </Switch>
                  </App>
                )
                : <Route component={getComponentAsync(import(/* webpackChunkName: "Login" */ 'page/Login'))} />
            }
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </LocaleProvider>
  </Provider>
);

export default hot(module)(Root);
