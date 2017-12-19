/**
 * Created by lingqiang on 2017/7/8.
 * 路由配置
 */
import React from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route} from "react-router-dom";
import createHistory from "history/createHashHistory";

const history = createHistory();
import {asyncComponent} from "./AsyncComponent";

const Home = asyncComponent(() => import(/* webpackChunkName: "home" */ './modules/home'));
const Main = asyncComponent(() => import(/* webpackChunkName: "main" */ './modules/main'));

const router = (
  <Router history={history}>
    <Router>
      <div>
        <Route exact path="/main" component={Main}/>
        <Route exact path="/home" component={Home}/>
      </div>
    </Router>
  </Router>
);

ReactDOM.render(router, document.getElementById("content"));







