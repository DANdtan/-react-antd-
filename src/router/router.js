import React from "react"
import { Route, Switch } from 'react-router-dom'
//import Login from "../view/login"
import async from "../components/asyncComponent"
//const App = async(() => import('../App'));
const indexpage = async(() => import('../view/indexpage'));
const Login = async(() => import('../view/login'));
//import indexpage from "../view/indexpage"
const routers = (
  <Switch>
    <Route path="/" component={indexpage}>
    </Route>
    <Route path="/Login" component={Login}>
    </Route>

  </Switch>
)
export default routers