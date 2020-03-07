import { fileaddress } from './base';
import { getCookie } from '../components/cookies';

let Authorization;
let X_Requested_Key;
const uuid = getCookie('uuid');
const loginType = getCookie('loginType');
Authorization = `Bearer ${uuid}`;
if (loginType) {
    try {
        X_Requested_Key = loginType + ',' + JSON.parse(sessionStorage.getItem('breadlist')).active.funid
    } catch (error) {
        X_Requested_Key = loginType + ',';
    }
}

export default (url, fileName) => {
    const formatFileName = fileName.replace(/[&#]/, '');
    return`${fileaddress}/upc/download?Authorization=${Authorization}&X_Requested_Key=${X_Requested_Key}&url=${url}&fileName=${formatFileName}`;
}