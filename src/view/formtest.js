import React, { Component } from "react"
import { Table, Button, Popconfirm, Input, Form, Row, Col } from 'antd';
import '../mock/mockdata'
import axios from "axios"
import { axiospost } from "../httptest/http"
import SelectTag from "../components/selectTag/selectTag"
const FormItem = Form.Item;
class testForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            count: 2,
            inputstate: {}
        };
    }
    componentDidMount() {
        axiospost('/doorItem', { id: '1' }, (data) => {
            // console.log(data)
            data.data.push({
                value: 1,
                label: "一个名字"
            })
            this.setState({
                dataSource: data.data
            })
        })
    }
    setValue = () => {
        this.props.form.setFieldsValue({
            mentao: 1
        })
    }
    getValue = () => {
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
            }
        });
    }
    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 8 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 16 },
                sm: { span: 16 },
            },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ maxWidth: 780 }}>
                <Button onClick={this.setValue}>赋值</Button>
                <Button onClick={this.getValue}>console</Button>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="门套"
                    >
                        {getFieldDecorator('mentao', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(
                            <SelectTag
                                option={this.state.dataSource}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="门套线"
                    >
                        {getFieldDecorator('mentaoxian', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(
                            <SelectTag />
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
const HocTestForm = Form.create()(testForm);
export default HocTestForm
