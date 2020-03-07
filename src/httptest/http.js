import axios from "axios"
import "../mock/mockdata"
export const axiospost=(url,params,callback)=>{
  //  console.log(params)
    axios.post(url,params,{headers:{Authorization:'me'}}).then(res=>{
 //       window.location.replace("/login")
        callback(res.data)
       // console.log(res)
    })
}