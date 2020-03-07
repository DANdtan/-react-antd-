import React, { Component, PropTypes } from "react"
import { Input, Icon, Row, Col, Select } from "antd"
import "./selectTag.less"
const Option = Select.Option;
class selectTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseEnter: false,//鼠标是否移入
            TopFocus: false,//最上面的输入框有没有聚焦
            selectValue: { value: "", label: "" },//被选中的值
            pageNow: 1,//当前页面，
            pageCount: 1,//一共多少页
            pageData: [],//分块后的数据
            //  catchData: [],//分块数据
            dataLength: 0,//多少条数据
            realValue: "",//真正的值
            topLabel: "",//显示的文本值

        }
    }
    static defaultProps = {
        option: [],//外部传进来的选项
        pageSize: 9,
        //  value: ""
    }
    componentDidMount() {
        this.labelTag.onmousewheel = this.mousewhell
    }
    componentWillReceiveProps(nextProps) {
        let { option, pageSize, value } = this.props;
        if (nextProps.option !== option
            || nextProps.option.length !== option.length) {
            this.countDataPage(nextProps.option)

        }
        if (nextProps.value !== value) {
            let findData = option.find(item => {
                return item.value === nextProps.value
            })
            if (findData === undefined) {
                this.setState({
                    realValue: nextProps.value,
                    selectValue: { label: "", value: nextProps.value },
                    topLabel: ""
                })
            }
            else {
                this.setState({
                    realValue: nextProps.value,
                    selectValue: findData,
                    topLabel: findData.label
                })
            }
        }
    }
    topInputFocus = (e) => {
        const { onFocus } = this.props;
        this.setState({
            TopFocus: true,
            topLabel: ""
        })
        if (onFocus) {
            onFocus()
        }
    }
    topInputBlur = (type = undefined, e) => {
        // e.stopPropagation()
        // e.preventDefault()
        if (!type) {
            e.persist();
            setTimeout(() => {
                let selectValue = this.state.selectValue
                if (!(document.hasFocus() &&
                    document.activeElement === e.target)) {
                    this.setState({
                        TopFocus: false,
                        topLabel: selectValue.label,
                        realValue: selectValue.value,
                    })
                    this.countDataPage(this.props.option)
                }
            }, 300)
        }
        else if (type === "Enter") {
            this.setState({ TopFocus: false })
        }
        else {
            this.setState({ TopFocus: false })
        }
    }
    focusByTag = (e) => {
        this.topInput.focus();
        e.stopPropagation()
        e.preventDefault()


    }
    mouseEnter = (e) => {//移入
        this.setState({
            mouseEnter: true
        })
    }
    mouseLeave = (e) => {//移入
        this.setState({
            mouseEnter: false
        })
    }
    //  pageSelect()
    getPageCountOption(count) {
        let option = [];
        for (let i = 1; i <= count; i++) {
            let op = (<Option value={i.toString()}>{i}</Option>)
            option.push(op);
        }
        return option
    }
    previousPage = () => {
        let pageNow = this.state.pageNow;
        if (pageNow <= 1) {
            return
        }
        else {
            pageNow -= 1;
            this.setState({
                pageNow: pageNow
            })
        }
    }
    nextPage = () => {
        let pageNow = this.state.pageNow;
        let pageCount = this.state.pageCount;
        if (pageNow === pageCount) {
            return
        }
        else {
            pageNow += 1;
            this.setState({
                pageNow: pageNow
            })
        }
    }
    mousewhell = (e) => {
        //这里要用debounce
        let wheelDelta = e.wheelDelta
        if (wheelDelta > 0) {
            this.previousPage()
        }
        else if (wheelDelta < 0) {
            this.nextPage()
        }
        // console.log(e)
    }
    //changeRealValue = (e) => {
    // let { onChange } = this.props;
    // onChange(e.target.value)
    // }
    cancelValue = () => {
        let { onChange } = this.props;
        this.setState({
            realValue: "",
            topLabel: "",
            TopFocus: false,
            selectValue: { value: "", label: "" }
        })
        onChange("")
    }
    clickLabel = (data, e) => {
        //    e.stopPropagation()
        let { onChange } = this.props;
        this.setState({
            realValue: data.value,
            topLabel: data.label,
            TopFocus: false,
            selectValue: data
        })
        onChange(data.value)
    }
    searchInput = (e, inittext = undefined) => {
        let text = ""
        if (inittext) {
            text = inittext

        }
        else {
            text = e.target.value
        }
        // this.setState({
        //     topLabel: 
        // })
        let searchResult = this.props.option.filter(item => {
            return item.label.indexOf(text) !== -1
        })
        // console.log(searchResult)
        this.countDataPage(searchResult, text)
    }
    countDataPage = (dataSource = [], text = undefined) => {
        //计算数据和页面
        let { pageSize } = this.props
        let pageCount = parseInt(dataSource.length / pageSize)
        let overplus = dataSource.length % pageSize//取余
        if (pageCount <= 0) {
            pageCount = 1
        }
        else if (overplus > 0) {
            pageCount += 1
        }
        var result = [];
        let dataLength = dataSource.length
        for (var i = 0, len = dataSource.length; i < len; i += pageSize) {
            result.push(dataSource.slice(i, i + pageSize));
        }//将所有数据分块
        //   console.log(result)
        // console.log(result)
        let obj = {
            pageCount: pageCount,
            pageData: result,
            dataLength: dataLength,
            pageNow: 1
        }
        if (text !== undefined) {
            obj.topLabel = text
        }
        this.setState(obj)
    }
    render() {
        const { option, onChange } = this.props
        return (
            <div className="TagContainer">
                <Input
                    onChange={this.searchInput}
                    value={this.state.topLabel}
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                    onPressEnter={this.topInputBlur.bind(null, "Enter")}
                    ref={(ref) => { this.topInput = ref }}
                    onBlur={this.topInputBlur.bind(null, undefined)}
                    placeholder={this.state.selectValue.label}
                    onFocus={this.topInputFocus}
                    suffix={<Icon type="close-circle-o"
                        onClick={this.cancelValue}
                        onMouseEnter={this.mouseEnter}
                        onMouseLeave={this.mouseLeave}
                        style={{ opacity: this.state.mouseEnter ? 1 : 0, }}
                        className="IconInput" />} />
                <Input style={{
                    display: "none"
                }}
                    value={this.state.realValue}
                // onChange={this.changeRealValue}
                />
                <div className="labelTag"
                    ref={ref => this.labelTag = ref}
                    style={{
                        opacity: this.state.TopFocus ? 1 : 0,
                        height: this.state.TopFocus ? 155 : 0
                    }}
                    onClick={
                        this.focusByTag
                    }
                >
                    <Row gutter={8}>
                        {this.state.pageData.length === 0 ? <label>暂无数据</label> :
                            this.state.pageData[this.state.pageNow - 1] ?
                                this.state.pageData[this.state.pageNow - 1].map((item, index) => {
                                    return (
                                        <Col title={item.label} onClick={this.clickLabel.bind(null, item)} className="selectCol" span={8} key={item.value + index}>
                                            <label className="selectLabel" >{item.label}</label>
                                        </Col>
                                    )
                                }) : <label>查找中...</label>
                        }
                    </Row>
                    <div className="navigationRow" >
                        <div className="navigation navigationCenter">
                            <a onClick={this.previousPage}>上页</a>&nbsp;|&nbsp;
                            <a onClick={this.nextPage}>下页</a>
                        </div>
                        <div className="navigationLeft navigation">
                            <label>当前{this.state.pageNow}/{this.state.pageCount}</label>
                        </div>

                        <div className="navigationRight navigation">
                            <label>{this.state.dataLength}条</label>
                        </div>
                        {/* <Col xs={12} sm={8} md={8} lg={8} xl={8} className="navigation">
                            <label>当前页:{this.state.pageNow}</label>
                        </Col>
                        <Col xs={12} sm={8} md={8} lg={8} xl={8} className="navigation">
                            <a>上页</a>&nbsp;&nbsp;
                            <a>下页</a>
                        </Col>
                        <Col className="navigation" xs={12} sm={8} md={8} lg={8} xl={8}>
                            <label> 共{this.state.pageCount}页</label>
                        </Col> */}
                        {/* <Col className="navigation" span={8}>
                            <Col span={7}>回到</Col>
                            <Col span={10}>
                                <Select
                                    onSelect={this.pageSelect}
                                >
                                    {this.getPageCountOption(this.state.pageCount)}
                                </Select>
                            </Col>
                            <Col span={7}>页</Col>
                        </Col> */}
                    </div>
                    {/* ????????<br />
                    ????????<br /> */}

                </div>
            </div >
        )
    }
}
// selectTag.PropTypes = {
//     value: PropTypes.string,//value
//     onChange: PropTypes.func,//onChange事件
//     onFocus: PropTypes.func,//最上方onFocus事件
//     option: PropTypes.array,//选项
//     pageSize: PropTypes.number,//每页多少条

// }
export default selectTag