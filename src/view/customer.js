import React, { Component } from "react"
import { Table, Button, Popconfirm, Input } from 'antd';
import '../mock/mockdata'
import axios from "axios"
import { axiospost } from "../httptest/http"
import EditableCell from "../components/editcell"
class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.inputchange=this.inputchange.bind(this)
    this.columns = [{
      title: '名字',
      dataIndex: 'name',
      width: '25%',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'name')}
        />
      ),
    }, {
      title: '年龄',
      dataIndex: 'age',
      width: "20%",
      sorter: (a, b) => a.age - b.age,
    }, {
      title: '地址',
      dataIndex: 'address',
      width: "30%",
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: '25%',
      render: (text, record) => {
        return (
          this.state.dataSource.length > 1 ?
            (
              <Popconfirm title="确定删除吗?" onConfirm={() => this.onDelete(record.key)}>
                <a href="#">删除</a>
              </Popconfirm>
            ) : null
        );
      },
    }];

    this.state = {
      dataSource: [],
      count: 2,
      inputstate: {}
    };
  }
  componentDidMount() {
    axiospost('/customer', { id: '1' }, (data) => {
      this.setState({
        dataSource: data
      })
    })
  }
  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ dataSource });

      }
    };
  }
  onDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  handleAdd = () => {
    const { count, dataSource } = this.state;
    axios.get('/newCustomer', { 'datatype': 'json' }).then(
      res => {
        res.data.key = count
        this.setState({
          dataSource: [...dataSource, res.data],
          count: count + 1,
        })
      }
    )
  }
  //   componentDidMount(){

  //   }
  inputchange(event) {
    //  console.log(event.target.id)
    let id = event.target.id
    let obj=Object.assign({},this.state.inputstate);
    obj[id]=event.target.value
    this.setState({
      inputstate: obj
    })
   // console.log(this.state.inputstate)
  }
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
        {/* <Input id="amount" onChange={this.inputchange} />
        <Input id="reamount" onChange={this.inputchange} /> */}
        <Button className="editable-add-btn" onClick={this.handleAdd}>新增一个随机数据</Button>
        <Table bordered dataSource={dataSource} columns={columns} scroll={{ y: 350 }} />
      </div>
    );
  }
}
export default EditableTable