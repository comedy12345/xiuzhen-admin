/*
 * @Description: 用户管理API/玩家管理API
 * @Author: ljf
 * @Date: 2022-09-09 09:37:57
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-09 10:20:55
 */
import useHttp from "@/hooks/useHttp"
import { IBaseQueryParameter, IBaseResp, IData } from "@/interface/types"
import { IUserForm, IUserList } from "@/interface/userType"
import { Ref } from "vue"

/**
 * @description: 查询用户列表
 * @return {*}
 * @author: ljf
 */
export const queryUserList = (data: IBaseQueryParameter, loading?: Ref<boolean>)
    : Promise<IBaseResp<IData<IUserList[]>>> => {
    return useHttp<IBaseResp<IData<IUserList[]>>>({
        url: '/api/admin/user/user-query',
        method: "POST",
        data,
        loading
    })
}

/**
 * @description: 查询玩家列表
 * @return {*}
 * @author: ljf
 */
 export const queryGamerList = (data: IBaseQueryParameter, loading?: Ref<boolean>)
 : Promise<IBaseResp<IData<IUserList[]>>> => {
 return useHttp<IBaseResp<IData<IUserList[]>>>({
     url: '/api/admin/user/player-query',
     method: "POST",
     data,
     loading
 })
}

export const saveUser = (data: IUserForm, loading?: Ref<boolean>): Promise<IBaseResp<any>> => {
    let url = "/api/admin/user/add";
    if (data.tid) {
        url = '/api/admin/user/save';
    }
    return useHttp<IBaseResp<any>>({
        url,
        method: "POST",
        data,
        loading
    })
}