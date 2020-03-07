import React, { Component } from "react"
import "../style/todolist.less"
import { connect } from "react-redux"
//import CSSTransitionGroup from 'react-addons-css-transition-group'
import { getTodoData, TodoAdd, setTodoActive, setTodoFilter } from "../redux/action/action"
import Todoitem from "./todoitem"
import { Icon, Row, Col, Input, Button, Spin, Select } from 'antd';
import '../mock/mockdata'
//import axios from "axios"
const Option = Select.Option;
const InputGroup = Input.Group;
class todolist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addtext: '',
        }
        this.addtextchange = this.addtextchange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.changeActive = this.changeActive.bind(this)
        this.selectChange = this.selectChange.bind(this)

    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getTodoData())
    }
    addtextchange(e) {
        let value = e.target.value;
        this.setState({
            addtext: value
        })
    }
    handleClick(e) {
        const { dispatch } = this.props;
        let date = new Date();
        let month = date.getMonth() + 1
        month = month < 10 ? '0' + month : month
        let day = date.getDate();
        day = day < 10 ? '0' + day : day;
        let now = date.getFullYear() + "-" + month + "-" + day;
        let id = this.props.TodoListState.listdata.length + 1;
        dispatch(TodoAdd(this.state.addtext, now, false, id))
    }
    changeActive(e) {
        const { dispatch } = this.props;
        dispatch(setTodoActive(e.target.id, true))
    }
    selectChange(value) {
        const { dispatch } = this.props;
        dispatch(setTodoFilter(value))
    }
    render() {
        return (
            <div className="listContainer" style={{ width: '100%', height: 360 }}>
                <div className="listContainer-title"><Icon type="exception" />&nbsp;待办列表</div>
                <div className="listContainer-body">
                    <Spin spinning={this.props.TodoListState.loading}>
                        <Row>
                            <Col span={18}>
                                <InputGroup compact>
                                    <Input value={this.state.addtext} onChange={this.addtextchange} style={{ width: '70%' }} />
                                    <Button onClick={this.handleClick} type="primary">+</Button>
                                </InputGroup>
                            </Col>
                            <Col span={6}>
                                <Select defaultValue="all" style={{ width: 120 }} onChange={this.selectChange}>
                                    <Option value="all">全部</Option>
                                    <Option value="ok">已完成</Option>
                                    <Option value="no">未完成</Option>
                                </Select>
                            </Col>
                        </Row>
                        <ul>
                            {/* <TransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={200}> */}
                                {this.props.TodoListState.listdata.map((item, index) => {
                                    return (
                                        <Todoitem changeActive={this.changeActive} key={item.id} text={item.text} id={item.id} time={item.time} active={item.active}></Todoitem>
                                    )
                                })}
                            {/* </TransitionGroup> */}
                        </ul>
                    </Spin>
                </div>
            </div>
        )
    }
}
function getTodoState(data, value) {
    let filterdata;
    switch (value) {
        case "all":
            return data;
        case "ok":
            filterdata = data.listdata.filter((item) => {
                return item.active === true
            })
            let okdata = Object.assign({}, data)
            okdata.listdata = filterdata;
            return okdata
        case "no":
            filterdata = data.listdata.filter((item) => {
                return item.active === false
            })
            let nodata = Object.assign({}, data)
            nodata.listdata = filterdata;
            return nodata
        default: return data
    }
}
function mapStateToProp(state) {
    return {
        TodoListState: getTodoState(state.TodoListState, state.TodoListState.filter)
    }
}

export default connect(mapStateToProp, null)(todolist)