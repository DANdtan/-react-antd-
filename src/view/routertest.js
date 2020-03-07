import React, { Component } from "react"
// import { Route, Link } from 'react-router-dom'
import async from "../components/asyncComponent"
import { Input } from "antd"
const paramstest = async(() => import('../components/paramtest'))
class routertest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addsum: 0
        }
        this.handleAdd = this.handleAdd.bind(this)
    }
    componentDidMount(){
        this.input.focus()
    }
    handleAdd(event) {
        //this.setState({ test: event.target.value });
        this.setState({ addsum: this.state.addsum + 1 })
    }
    render() {
        return (
            <div>
                <p>{this.state.addsum}</p>
                <button onClick={this.handleAdd}>加1</button>
                <Input></Input>
                <input ref={input => this.input = input}></input>
                {/* <Link to={this.props.match.path+'/test/'+this.state.addsum}>link</Link> */}
                {/* <Route path={this.props.match.path + '/test/:anum'} component={paramstest}></Route> */}
            </div>
        )
    }
}
export default routertest
//aliveHoc({ name: "routertest" })(