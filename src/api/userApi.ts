/*
 * @Description: 用户管理API/玩家管理API
 * @Author: ljf
 * @Date: 2022-09-09 09:37:57
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-13 16:36:23
 */
import useHttp from "@/hooks/useHttp"
import { IBaseQueryParameter, IBaseResp, IData } from "@/interface/types"
import { IUpdPwd, IUserForm, IUserList } from "@/interface/userType"
import { IUserInfo } from "@/store/userInfo"
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
/**
 * 重置密码
 * @param loading 
 * @returns 
 */
export const resetPassword = (data: IUserForm,loading?: Ref<boolean>): Promise<IBaseResp<string>> => {
    return useHttp<IBaseResp<string>>({
        url: '/api/admin/user/reset-user-passwd',
        method: "POST",
        data,
        loading
    })
}

/**
 * 查询当前用户信息
 * @param loading 
 * @returns 
 */
export const getCurrentUserInfo =(loading?: Ref<boolean>): Promise<IBaseResp<IUserInfo>> => {
    return useHttp<IBaseResp<IUserInfo>>({
        url: '/api/admin/user/get-user-query',
        method: "POST",
        loading
    })
}
/**
 * 修改密码
 * @param data 
 * @param loading 
 * @returns 
 */
export const updatePassword=(data: IUpdPwd,loading?: Ref<boolean>): Promise<IBaseResp<string>> => {
    return useHttp<IBaseResp<string>>({
        url: '/api/admin/user/user-save',
        method: "POST",
        data,
        loading
    })
}