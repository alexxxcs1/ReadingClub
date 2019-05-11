import { api } from "common/app";

async function isRegister(){
    let result = false;
    await api.isRegister(window.location.href).then(res=>{
        if (res.code!==200) {
            result =  false;
            window.location.href = res.data.url;
        }else{
            result = true;
        }
    },err=>{
        console.log(err);
    })
    return result
};

export default isRegister
