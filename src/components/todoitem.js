import React, { Component ,PropTypes} from "react"
import "../style/todolist.less"
import {  Row, Col, Button } from 'antd';

class todoitem extends Component {
    constructor(props)
    {
        super(props)
    }
    render() {
        const {text,time,active,id}=this.props;
        return (
         
            <li>
                <div className="itemcontainer">
                    <Row>
                        <Col span={16}>{text}</Col>
                        <Col span={4}>{time}</Col>
                        <Col span={4}>{active?<div  className="itemcontainer-greenfont">已完成</div>:<div id={id} onClick={this.props.changeActive} className="itemcontainer-redfont">未完成</div>}</Col>
                    </Row>
                </div>
            </li>
        )
    }
}
// todoitem.PropTypes={
//     text:PropTypes.string.isRequired,
//     time:PropTypes.string.isRequired,
//     active:PropTypes.bool.isRequired,
//     id:PropTypes.number.isRequired,
//     changeActive:PropTypes.func.isRequired
// }
export default todoitem