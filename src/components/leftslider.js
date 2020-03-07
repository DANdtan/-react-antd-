import React, { Component } from "react"
import { Menu, Icon } from 'antd';
import "../style/leftslider.less";
import { connect } from "react-redux"
import { settab } from "../redux/action/action"
const SubMenu = Menu.SubMenu;
class leftSlider extends Component {
    constructor(props) {
        super(props)
        this.itemClick = this.itemClick.bind(this)
        this.toggleCollapsed = this.toggleCollapsed.bind(this)

        this.state = {
            collapsed: false,
            sliderdata: [
                {
                    "id": '001',
                    "name": "客户",
                    "icon": "book",
                    "url": "",
                    "children": [
                        { "id": '0011', "name": "客户资料", "url": "customer", "icon": "user" },
                        { "id": '0012', "name": "表格控件测试", "url": "formtest", "icon": "user" }
                    ]
                },
                {
                    "id": '002',
                    "name": "测试",
                    "icon": "calculator",
                    "url": "",
                    "children": [
                        { "id": '0021', "name": "router测试", "url": "routertest", "icon": "tool" },
                        { "id": '0022', "name": "支付测试", "url": "pay", "icon": "tool" },
                    ]
                },
            ]
        }
    }
    toggleCollapsed() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    setSliderMenu(options) {
        return options.map((item, index) => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.url ? item.url : item.id} name={item.name}>
                        <Icon type={item.icon ? item.icon : 'laptop'} title={item.name} />
                        <span className="menu-name">{item.name}</span>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu key={index} title={
                        <span>
                            <Icon type="caret-down" title={item.name} />
                            <span className="menu-name">{item.name}</span>
                        </span>}>
                        {
                            item.url ?
                                <Menu.Item key={item.url} name={item.name}>
                                    <Icon type={item.icon ? item.icon : 'laptop'} title={item.name} />
                                    <span className="menu-name">{item.name}</span>
                                </Menu.Item> : null
                        }

                        {
                            item.children && item.children.length > 0 ? this.setSliderMenu(item.children) : null
                        }
                    </SubMenu>
                )
            }
        })
    }
    itemClick(e) {
        const { dispatch, historypush } = this.props;
        dispatch(
            settab(
                e.item.props.name,
                '',
                e.key)
        )
        historypush(e.key)
    }
    render() {
        return (
            <div className="leftContainer" style={{ width: this.state.collapsed ? '64px' : '220px' }}>
                <div style={{ width: this.state.collapsed ? '64px' : '100%', paddingRight: this.state.collapsed ? '0px' : '24px' }} className="collapsedbtn" onClick={this.toggleCollapsed}>
                    <Icon style={{ color: '#ededed', fontSize: 15 }} type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </div>
                <Menu
                    onClick={this.itemClick}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    {this.setSliderMenu(this.state.sliderdata)}
                    {/* <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>选项1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="desktop" />
                        <span>选项2</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="inbox" />
                        <span>选项3</span>
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu> */}
                </Menu>

            </div>
        );
    }
}
function mapStatetoProps(state) {
    return {
        tablist: state.TabList
    }
}
export default connect(mapStatetoProps)(leftSlider)
