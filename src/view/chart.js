import React, { Component } from "react"
import ColorPane from "../components/colorPane"
import EChart from "../components/echart"
import TodoList from "../components/todolist"
import { Row, Col } from 'antd';
class chart extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Row type="flex" gutter={16} justify="center" align="top">
                    <Col xs={24} sm={12} md={6} lg={6} xl={6}><ColorPane icon="tag" leftcolor="#21ABD8" number={46} title="销售" /></Col>
                    <Col xs={24} sm={12} md={6} lg={6} xl={6}><ColorPane icon="shopping-cart" leftcolor="#1cbba7" number={39} title="订单" /></Col>
                    <Col xs={24} sm={12} md={6} lg={6} xl={6}><ColorPane icon="user" leftcolor="#f8cb01" number={93} title="客户" /></Col>
                    <Col xs={24} sm={12} md={6} lg={6} xl={6}><ColorPane icon="bar-chart" leftcolor="#f86c6b" number={64} title="总额" /></Col>
                </Row>
                <div style={{ width: '100%', height: '32px' }}></div>
                <Row gutter={16}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        {/* <EChart color="#D53A35" title="年销售" seriesname='销量' type="bar" url="/bardata" /> */}
                        <EChart title="月销售比例" seriesname='销量' type="pie" url="/piedata" />
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>

                        <TodoList />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default chart