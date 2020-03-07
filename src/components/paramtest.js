import React, { Component } from "react"
export default class paramtest extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            anum:0
        }
    }
    componentDidMount()
    {
        const {anum} =this.props.match.params;

        this.setState({
            anum:anum
        })
    }
    render(){
        return (
            <div>
                你传过来的值是{this.state.anum}
            </div>
        )
    }
}