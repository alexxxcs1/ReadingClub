import { api } from "common/app";

let isRegister = url => {
    api.isRegister(window.location.href).then(res=>{
        console.log(res);
        if (res.code!==200) {
            window.location.href = res.data.url
        }
    },err=>{
        console.log(err);
    })
};

export default isRegister
