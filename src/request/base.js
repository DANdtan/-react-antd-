let address = "http://192.168.26.198:9999";//一般的请求地址
let fileaddress = "http://192.168.5.110:62506";//文件上传地址
let crmFileAddress = "http://192.168.2.6:8060";//CRM的C#上传文件地址
let imgAddress = 'http://192.168.5.110/';
let socketIp = "192.168.5.51:9994";
let ticket = '';

// import {address,fileaddress,crmFileAddress,imgAddress,socketIp,ticket} from '../http/http.js'
let merchantCode = 'mt';

if (process.env.NODE_ENV === "production") { // 生产环境 地址由外部设置
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const addressObj = JSON.parse(xhr.responseText);
            address = addressObj.address;
            fileaddress = addressObj.fileaddress;
            crmFileAddress = addressObj.crmFileAddress;
            imgAddress = addressObj.imgAddress;
            socketIp = addressObj.socketIp;
            merchantCode = addressObj.merchantCode;
            ticket = addressObj.ticket;
        }
    }
    xhr.open("GET", `${process.env.PUBLIC_URL}/address.json`, false);
    xhr.send();
}

export {
    address,
    fileaddress,
    crmFileAddress,
    imgAddress,
    socketIp,
    merchantCode,
    ticket,
}