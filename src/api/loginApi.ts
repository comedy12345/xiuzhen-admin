import useHttp from "@/hooks/useHttp";
import { IBaseResp } from "@/interface/types";
import { ILoginRequest, ILoginResponse } from "../interface/loginTypes";


// 登录
export const reqLogin = async (data: ILoginRequest) => {
    return await useHttp<IBaseResp<ILoginResponse>>({
        method: 'POST',
        url: '/api/admin/user/login',
        data
    })
}