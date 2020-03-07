import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import "../style/header.less"
import * as action from "../redux/action/action"
import headimg from "../asset/avatar.jpg"
import { Menu, Modal, Dropdown, Icon, Badge, Button } from 'antd';
const confirm = Modal.confirm
class header extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
        this.SetNoAcitve = this.SetNoAcitve.bind(this)
        this.state = {
            iconcolor: '#ededed',//字黑：2a2f32 白：ededed
            headbgcolor: '#0099cc'//背景黑：373d41 白 ffffff 蓝：2494f2
        }
    }
    logout() {
        const { dispatch } = this.props;
        var self = this;
        confirm({
            title: '提示',
            content: '确认退出登录吗？',
            onOk() {
                dispatch(action.setuser(""))
                self.props.logout();
            },
        })
    }
    SetNoAcitve() {
        const { dispatch } = this.props;
        dispatch(action.updateTabActive(''))

    }
    render() {
        const usermgs = this.props.usermgs;
        let indexdata = {
            'mail': [{ 'text': '你的报销申请已通过' }],
            'message': [{ 'text': '张三：同事你好' }, { 'text': '小五：处理下这个表' }],
            'pushpin': [{ 'text': '整理会议记录' }]
        }
        const usermenu = (
            <Menu>
                <Menu.Item>
                    <Button style={{ backgroundColor: '#108ee9' }} type="primary" size="small" onClick={this.logout}>退出</Button>
                </Menu.Item>
            </Menu>
        )
        const funmenu = (text, data, type) => {
            return (
                <Menu>
                    <Menu.Item>
                        <a style={{ fontWeight: 'bold' }}>{text}</a>
                    </Menu.Item>
                    {data[type].map(((item, index) => {
                        return (<Menu.Item key={item.text}> <a >{item.text}</a> </Menu.Item>)
                    }))}
                </Menu>
            )
        }
        return (
            <header className="header-container" style={{ backgroundColor: this.state.headbgcolor }} >
                <Link to="/" onClick={this.SetNoAcitve} className="header-left">
                    <Icon type="desktop" style={{ color: this.state.iconcolor }} />
                </Link>
                <div className="rightcontainer">
                    <div className="header-right">
                        <Dropdown overlay={usermenu}>
                            <a style={{ color: this.state.iconcolor }}>
                              <div className="header-userright" ><div className="headimg" style={{backgroundImage:'url(' + headimg + ')'}}></div>  &nbsp;<div>{usermgs.username}</div></div>
                            </a>
                        </Dropdown>
                    </div>
                    <div className="header-right">
                        <Dropdown overlay={funmenu('邮件', indexdata, 'mail')}>
                            <a>
                                <Badge overflowCount={99} style={{ backgroundColor: '#f04134' }} count={indexdata['mail'].length}>
                                    <Icon type="mail" style={{ color: this.state.iconcolor }} />
                                </Badge>
                            </a>
                        </Dropdown>
                    </div>
                    <div className="header-right">
                        <Dropdown overlay={funmenu('信息', indexdata, 'message')}>
                            <a>
                                <Badge overflowCount={99} style={{ backgroundColor: '#ffbf00' }} count={indexdata['message'].length}>
                                    <Icon type="message" style={{ color: this.state.iconcolor }} />
                                </Badge>
                            </a>
                        </Dropdown>
                    </div>
                    <div className="header-right">
                        <Dropdown overlay={funmenu('备忘录', indexdata, 'pushpin')}>
                            <a>
                                <Badge overflowCount={99} style={{ backgroundColor: '#87d068' }} count={indexdata['pushpin'].length}>
                                    <Icon type="pushpin-o" style={{ color: this.state.iconcolor }} />
                                </Badge>
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </header>
        )
    }
}
function mapStatetoProps(state) {
    return {
        usermgs: state.usermgs
    }
}
export default connect(mapStatetoProps)(header)