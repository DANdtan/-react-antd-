import React,{Component,PropTypes} from "react"
import {Icon} from 'antd';
import "../style/colorpane.less"
export default class colorPane extends Component{
    constructor(props)
    {
        super(props)
    }
    render(){
        return (
            <div className="colorpane">
                <div className="colorpane-commom colorpane-left" style={{backgroundColor:this.props.leftcolor}}>
                    <div><Icon style={{color:'#ffffff'}}  type={this.props.icon} /></div>
                    {/* <Icon type="tag" /> */}
                </div>
                <div className="colorpane-commom colorpane-right">
                    <div className="colorpane-right-num">{this.props.number}</div>
                    <div className="colorpane-right-title">{this.props.title} </div>
                </div>
            </div>
        )
    }
}
// colorPane.PropTypes={
//     leftcolor:PropTypes.string.isRequired,
//     icon:PropTypes.string.isRequired,
//     number:PropTypes.string.number,
//     title:PropTypes.string.isRequired
// }