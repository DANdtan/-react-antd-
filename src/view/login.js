import React, { Component } from "react"
import { connect } from "react-redux"
import { Row, Col, Icon, Form, Input, Button } from 'antd';
import '../style/login.less'
import * as action  from "../redux/action/action"
const FormItem = Form.Item
class Login extends Component {
    constructor(props, context) {
        super(props)
        this.state = {
            bottom: 26
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //  console.log('Received values of form: ', values);
                const {dispatch}=this.props;
                dispatch(action.setuser(values.userName))
                this.props.history.push('/')
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-header">
                    <div className="headertext">
                        React管理系统
                   </div>
                </div>
                <div className="login-intro">
                    <div className="border-div">
                        <div style={{ 'marginBottom': this.state.bottom + 'px' }}>
                            <Row type="flex" align="top" justify="space-around">
                                <Col span={8} push={5}>
                                    <Icon type="github" style={{ fontSize: 20, color: '#0062ad' }} />
                                </Col>
                                <Col span={16} pull={3}>
                                    <div>欢迎登陆</div>
                                </Col>
                            </Row>
                        </div>
                        <Row type="flex" align="top" justify="space-around">
                            <Col span={18}>
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <FormItem hasFeedback>
                                        {getFieldDecorator('userName', {
                                            rules: [{ required: true, message: '请输入不为空的用户名!' }],
                                        })(
                                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                                            )}
                                    </FormItem>

                                    <FormItem>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: '请输入密码!' }],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                                            )}
                                    </FormItem>

                                    <FormItem>
                                        <Button size="large" style={{'background':'#1DA57A'}} type="primary" htmlType="submit">
                                            log in
                                        </Button>
                                    </FormItem>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                    {/* <div className="author">https://github.com/DANdtan/-react-antd-</div> */}
                </div>
            </div>
        );
    }
}
const WrappedNormalLoginForm = Form.create()(Login)
export default connect()(WrappedNormalLoginForm)