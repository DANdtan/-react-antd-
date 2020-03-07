import React, { useEffect, useState, memo, useMemo } from "react"
import request from "../../request"
// import styles from "./style.less"
// import CustomTable from '../../components/customTable';
import {
    Button, InputNumber, Icon, Result, Modal, Table
} from "antd";
// import SearchInput from "../../components/SearchInput/SearchInput";
// import { OutBtn } from "../../components/btnRootCom"
// import hoc from '../../components/tableFilterHoc'
// import bank from '../../image/icon/bank.png'
// import TableDropFilter from '../../components/tableDropFilter';
// import SizeModal from "../../components/sizeModal/sizeModal";

const scriptCode = "frmAmtRechargeMst"
const styles = {}
const OrderMoneyInvest = ({ ...props }) => {
    const [visible, setVisible] = useState(false)
    const [resVis, setResVis] = useState(false)
    const [money, setMoney] = useState(0)
    const [nowOrd, setNowOrd] = useState({})
    const [checkResult, setCheckResult] = useState({})
    const [dataSource, setDataSource] = useState([{ age: 18, name: "小李" }])
    const [checkLoading, setCheckLoading] = useState(false)

    useEffect(() => {
        request.post("/inventory/FacPurchaseMst/SearchAmt").then(data => {
            console.log(data)
        })
    }, [])

    useEffect(() => {
        if (checkResult.status) {
            setResVis(true)
        }
    }, [checkResult])

    const columns = [
        {
            title: 'Age',
            dataIndex: 'age',
            render: (text, record, index) => {
                return <InputNumber
                    value={text}
                    onChange={v => {
                        record["age"] = v
                        dataSource[index] = record
                        setDataSource(dataSource.slice(0))
                    }}></InputNumber>
            }
        },
        {
            title: 'name',
            dataIndex: 'name',
        },
    ]

    const amtSum = useMemo(() => {
        let list = dataSource.data || []
        if (list.length > 0) {
            let sum = list.reduce((prev, curr) => {
                return Number(prev.origincryAmtWitax) + Number(curr.origincryAmtWitax)
            })
            return sum
        }
        else return 0

    }, [dataSource])

    const moneyInvest = () => {
        request.post("/payapi/abcpay/post", { amount: money, isMobile: false }).then(data => {
            setNowOrd(data)
            console.log("noword")
            console.log(data)
            let url = data.url
            openWin(url)
            openConfirm(data)
        }).catch(ex => {
            // openWin("http://www.baidu.com")
        })
        // openConfirm()
    }
    const openConfirm = (data) => {
        setVisible(false)
        Modal.confirm({
            icon: <Icon type="exclamation-circle" theme="twoTone"></Icon>,
            title: "请在新开的支付页面上完成付款",
            content: "支付完成前请勿关闭页面！",
            onCancel: () => { },
            cancelText: "关闭",
            onOk: () => {
                return new Promise((resolve, reject) => {
                    let orderNo = data.orderNo ? data.orderNo : nowOrd.orderNo
                    if (orderNo) {
                        request.get(`/payapi/abcpay/query/${orderNo}`).then(data => {
                            setCheckResult(data)
                            setResVis(true)
                            resolve()
                            // return new Promise()
                        }).catch(() => {
                            reject()
                        });
                    }
                    else reject()
                })
            },
            okText: "已完成支付"
        })
    }
    const getResult = () => {
        // console.log("beforeGetResule")
        if (nowOrd.orderNo) {
            let orderNo = nowOrd.orderNo
            setCheckLoading(true)
            request.get(`/payapi/abcpay/query/${orderNo}`).then(data => {
                setCheckResult(data)
                setCheckLoading(false)
                setResVis(true)
                // return new Promise()
            })
        }
        // else return new Promise()
    }
    const openWin = (url) => {
        let a = document.createElement("a");
        a.setAttribute("href", url)
        a.setAttribute("target", "_blank")
        a.setAttribute("id", "camnpr")
        // document.body.appendChild(a)
        a.click()
    }

    let ordStatus = useMemo(() => {
        let status = checkResult.statusCode
        if (status == "01") {//未支付
            return {
                title: "尚未支付",
                subTitle: "",
                status: "info"
            }
        }
        else {
            let ifsuss = checkResult.ifSuccess
            if (ifsuss == 1) {
                return {
                    status: "success",
                    title: "支付成功",
                    subTitle: `${checkResult.orderDate} 订单号:${checkResult.orderNo} 金额:${checkResult.amount} `
                }
            }
            else if (ifsuss == 0) {
                return {
                    title: "支付失败",
                    status: "error",
                    subTitle: `${checkResult.message || ""}`
                }
            }
        }
    }, [checkResult])

    useEffect(() => {
        // if (ordStatus.status == "success") {
        //     setCheckResult({})
        //     setNowOrd({})
        // }
    }, [ordStatus])

    const reset = () => {
        console.log("reset")
        console.log(nowOrd)
        openWin(nowOrd.url)
        getResult()
        // setResVis(true)

    }
    const clear = () => {
        setResVis(false)
        setNowOrd({})
        setCheckResult({})

    }
    const getFooter = () => {
        let status = ordStatus.status
        if (status == "success") {
            return [<Button onClick={clear} key="sucess">确定</Button>]
        }
        else if (status == "error") {
            return [<Button onClick={reset} loading={checkLoading} key="error">重新支付</Button>,
            <Button onClick={getResult} loading={checkLoading} key="refresh" type="primary">刷新</Button>]
        }
        else if (status == "info") {
            return [<Button onClick={reset} loading={checkLoading} key="info">重新支付</Button>,
            <Button onClick={getResult} loading={checkLoading} key="refresh" type="primary">刷新</Button>]
        }
    }
    return (
        <div>
            {/* <div style={{ visibility: "hidden", position: "absolute" }}>
                <TableDropFilter data={singleFlowData} scriptCode={scriptCode} refresh={refresh}>
                </TableDropFilter>
            </div> */}
            <div style={{ padding: 16, fontSize: 18, borderBottom: "1px solid #d9d9d9" }}>公用订金划扣</div>
            <div className={styles.topArea}>
                <div className={styles.flexalign} >
                    {/* <div className="mr-16">待订金划扣：<span className={styles.redMoney}>￥100</span></div> */}
                    <div className="mr-16">公用订金余额：<span className={styles.redMoney}>￥100</span> </div>
                    {/* <div className="mr-16">需充值：<span className={styles.redMoney}>￥100</span></div> */}
                    <div>
                        <Button onClick={() => { setVisible(!visible) }}
                            type="primary">在线充值</Button>
                    </div>
                </div>
                {/* <div>
                    <SearchInput callInMounted={false} placeholder={addQueryName.join('/')} onSearch={searchCallBack}></SearchInput>
                </div> */}
                <Modal
                    size="small"
                    onCancel={() => { setVisible(false) }}
                    maskClosable={true}
                    title='充值'
                    visible={visible}
                    onOk={moneyInvest}
                >
                    <React.Fragment>
                        <div className={styles.title}>选择付款方式</div>
                        <div className={styles.bankArea}>
                            {/* <div className={styles.imgArea}> */}
                            <img className={styles.imgArea} width={"100px"} height={47}
                            // src={bank}
                            >
                            </img>
                            {/* </div> */}
                        </div>
                        <div className={"mb-16"}>需充值：<span className={styles.redFont}>￥13000</span> =
                        <span className={styles.greyFont}> 待订金划扣（290000）- 公用订金余额（160000）
                        </span>
                        </div>
                        <div>
                            <span className={`mr-8 ${styles.title}`}>充值金额</span>
                            <InputNumber onChange={setMoney} value={money} min={0}></InputNumber>
                            <span className={"ml-8"}>元</span>
                        </div>
                    </React.Fragment>
                </Modal>
                <Modal
                    // size="small"
                    onCancel={() => {
                        if (ordStatus.status == "success") {
                            setCheckResult({})
                            setNowOrd({})
                        }
                        setResVis(false)
                    }}
                    maskClosable={false}
                    title='结果'
                    visible={resVis}
                    footer={getFooter()}
                // onOk={moneyInvest}
                >
                    <Result
                        status={ordStatus.status}
                        title={ordStatus.title}
                        subTitle={ordStatus.subTitle || ""}
                    ></Result>
                </Modal>
            </div>
            <Table

                columns={columns}
                dataSource={dataSource}
                // onPaginationChange={false}
                pagination={false}
                rowKey='id'
            />
        </div>
    )
}
export default memo(OrderMoneyInvest) 