import React, { Component } from "react"
//import { withRouter } from 'react-router'
import { connect } from "react-redux"
import Header from "../components/header"
import LeftSlider from "../components/leftslider"
import Tabs from "../components/tablist"
import 'antd/dist/antd.less'
import "../style/indexpage.less"
import async from "../components/asyncComponent"
import { Route } from 'react-router-dom'
import {
    Provider,
    // KeepAlive,
} from 'react-keep-alive';
const chartpage = async(() => import('./chart'))
const Customer = async(() => import('./customer'), "customer")
const Routertest = async(() => import('./routertest'), "routertest")
const Formtest = async(() => import('./formtest'), "formtest")
const Pay = async(() => import('./pay'), "pay")
//import chartpage from "./chart"
class indexpage extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            collapsed: false,
        }
        this.checkUserName = this.checkUserName.bind(this);
        this.historyPush = this.historyPush.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentWillMount() {
        this.checkUserName()
    }
    checkUserName() {
        let username = this.props.usermgs.username;
        if (username === "" || !username) {
            this.props.history.push('/Login')
        }
    }
    logout() {
        this.props.history.push('/Login')
    }
    historyPush(url) {
        this.props.history.push(this.props.match.path + url)
    }
    render() {
        return (
            <div className="indexContainer">
                <Header logout={this.logout}></Header>
                <div className="content">
                    <div className="content-left">
                        <LeftSlider historypush={this.historyPush} />
                    </div>
                    <div className="content-right">
                        <Tabs historypush={this.historyPush} />
                        <Route path={this.props.match.path} exact component={chartpage}>
                        </Route>
                        <Provider include={["customer", "routertest", "formtest"]}>

                            <Route path={this.props.match.path + 'customer'} component={Customer} >
                            </Route>
                            <Route path={this.props.match.path + 'routertest'} component={Routertest} >
                            </Route>
                            <Route path={this.props.match.path + 'formtest'} component={Formtest}>
                            </Route>
                            <Route path={this.props.match.path + 'pay'} component={Pay}>
                            </Route>

                        </Provider>

                    </div>
                </div>
            </div>

        );
    }
}
function mapStateToProps(state) {
    return {
        usermgs: state.usermgs
    }
}
export default connect(mapStateToProps)(indexpage)