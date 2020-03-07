import React, { Component } from "react"
import { connect } from "react-redux"
import { Tabs } from "antd"
import { updateTabActive, delTab } from "../redux/action/action"
const TabPane = Tabs.TabPane;
class tabs extends Component {
    constructor(props) {
        super(props);
    }
    onChange = (activeKey) => {
        //  this.setState({ activeKey });
        const { dispatch, historypush } = this.props;
        dispatch(updateTabActive(activeKey))
        historypush(activeKey)
    }
    onEdit = (targetKey, action) => {

        if (action === "remove") {
            const { dispatch, historypush, TabList } = this.props
            let delcopystate = { ...TabList }
            let lastIndex;
            delcopystate.list.forEach((item, i) => {
                if (item.url === targetKey) {
                    lastIndex = i - 1;
                }
            })
            const statelist = delcopystate.list.filter(item =>
                item.url !== targetKey
            )
            if (lastIndex >= 0 && delcopystate.active === targetKey) {
                delcopystate.active = statelist[lastIndex].url
            }
            delcopystate.list = statelist;
            dispatch(delTab(delcopystate))
            if (delcopystate.list.length !== 0) {
                historypush(delcopystate.active)
            }
            else {
                historypush('')
            }
        }

    }
    // remove = (targetKey) => {
    //     let activeKey = this.state.activeKey;
    //     let lastIndex;
    //     this.state.panes.forEach((pane, i) => {
    //         if (pane.key === targetKey) {
    //             lastIndex = i - 1;
    //         }
    //     });
    //     const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    //     if (lastIndex >= 0 && activeKey === targetKey) {
    //         activeKey = panes[lastIndex].key;
    //     }
    //     this.setState({ panes, activeKey });
    // }
    render() {
        const { TabList } = this.props;
        return (
            <div>
                {/* <div style={{ marginBottom: 16 }}>
                    <Button onClick={this.add}>ADD</Button>
                </div> */}
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={TabList.active}
                    type="editable-card"
                    onEdit={this.onEdit}
                >
                    {TabList.list.map(pane => <TabPane tab={pane.title} key={pane.url}>{pane.content}</TabPane>)}
                </Tabs>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        TabList: state.TabList
    }
}
export default connect(mapStateToProps)(tabs)