/*
 * @Description: 游戏服务Api
 * @Author: ljf
 * @Date: 2022-07-26 09:05:35
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-09 09:57:16
 */

import useHttp from "@/hooks/useHttp";
import { IBaseQueryParameter, IBaseResp, IData } from "@/interface/types";
import { IDomain, IGameServicesForm, IGameServicesList } from "../interface/gameServicesTypes";
import { Ref } from "vue";

/**
 * @description: 新增或修改游戏服务
 * @param {IGameServicesForm} data 
 * @param {Ref} loading
 * @return {*} Promise<IBaseResp<any>>
 * @author: ljf
 */
export const saveGameServices = (data: IGameServicesForm, loading?: Ref<boolean>): Promise<IBaseResp<any>> => {
    let url = "/api/admin/servers/servers-add";
    if (data.tid) {
        url = '/api/admin/servers/servers-update';
    }
    return useHttp<IBaseResp<any>>({
        url,
        method: "POST",
        data,
        loading
    })
}

/**
 * @description: 查询游戏服务器
 * @param {IBaseQueryParameter} data
 * @param {Ref} loading
 * @return {*} Promise<IBaseResp<IData<IGameServicesList[]>>>
 * @author: ljf
 */
export const queryGameServices = (data: IBaseQueryParameter, loading?: Ref<boolean>)
    : Promise<IBaseResp<IData<IGameServicesList[]>>> => {
    return useHttp<IBaseResp<IData<IGameServicesList[]>>>({
        url: '/api/admin/servers/servers-query',
        method: "POST",
        data,
        loading
    })
}

export const queryDomain = (loading?: Ref<boolean>)
    : Promise<IBaseResp<IDomain[]>> => {
    return useHttp<IBaseResp<IDomain[]>>({
        url: '/api/admin/servers/domain-name-query',
        method: "POST",
        loading
    })
}

/**
 * @description: 删除游戏服务器
 * @param {number} tid
 * @param {Ref} loading
 * @return {*} Promise<IBaseResp<any>>
 * @author: ljf
 */
export const deleteGameServices = (tid: number, loading?: Ref<boolean>): Promise<IBaseResp<any>> => {
    return useHttp<IBaseResp<any>>({
        url: '/api/admin/servers/servers-remove',
        method: "GET",
        params: { tid },
        loading
    })
}