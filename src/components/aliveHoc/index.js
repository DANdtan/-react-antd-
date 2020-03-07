import React, { Component } from "react"
import {
    KeepAlive
} from 'react-keep-alive';
const hoc = ({ name = "" }) => WrapCom => {
    return class extends Component {
        render() {
            return (
                <KeepAlive name={name}>
                    <WrapCom {...this.props}></WrapCom >
                </KeepAlive>
            )
        }
    }
}
export default hoc