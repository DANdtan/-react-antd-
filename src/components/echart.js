import React, { Component, PropTypes } from 'react';
//import echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import '../mock/mockdata'
import axios from "axios"
//import fetch from 'isomorphic-fetch'
class Recharts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colname: [],
            bardata: [],
            piedata:[{value:'',name:''}]
        }
        this.getData = this.getData.bind(this)

    }
    getOption() {
        let option;
        if (this.props.type === "bar") {
            option = {
                title: { text: this.props.title },
                color: [this.props.color],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '1%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.state.colname,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: this.props.seriesname,
                        type: this.props.type,
                        barWidth: '60%',
                        data: this.state.bardata
                    }
                ]
            };
          //  return option;
        }
        else if (this.props.type === "pie") {
            option = {
                title: { text: this.props.title },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    data: this.state.colname
                },
                series: [
                    {
                        name: this.props.seriesname,
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: this.state.piedata
                    }
                ]
            };
        }
        return option
    }
    getData(type, url) {
        switch (type) {
            case 'bar':
                axios.get(url, { 'datatype': 'json' }).then(
                    res => {
                        this.setState({
                            colname: res.data.colname,
                            bardata: res.data.bardata
                        })
                    }
                )
                return
            case 'pie':
                axios.get(url, { 'datatype': 'json' }).then(
                    res => {
                        this.setState({
                            colname: res.data.colname,
                            piedata: res.data.piedata
                        })
                      //  console.log(res.data.piedata)
                    }
                    
                )
                return
            default:
                return
        }
    }
    componentDidMount() {
        const { type, url } = this.props;
        this.getData(type, url)
    }
    render() {
        return (
            <div style={{ width: '100%', height: 360 }}>
                <ReactEcharts ref={(e) => {
                    this.echarts_react = e;
                }} option={this.getOption()} />
            </div>
        );
    }
}
// Recharts.PropTypes = {
//     color: PropTypes.string,
//     title: PropTypes.string.isRequired,
//     seriesname: PropTypes.string.number,
//     type: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
// }
export default Recharts;