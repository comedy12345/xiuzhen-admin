import useHttp from "@/hooks/useHttp";
import { IBaseQueryParameter, IBaseResp, IData } from "@/api/types";
import { IGameServicesForm, IGameServicesList, IQueryParameter } from "./gameServicesTypes";

// 保存游戏服务器
export const saveGameServices = (data: IGameServicesForm) => {
    let url = "/api/admin/servers/servers-add";
    if (data.tid) {
        url = '/api/admin/servers/servers-update';
    }
    return useHttp<IBaseResp<any>>({
        url,
        method: "POST",
        data
    })
}

// 查询游戏服务器
export const queryGameServices = (data: IBaseQueryParameter) => {
    return useHttp<IBaseResp<IData<IGameServicesList[]>>>({
        url: '/api/admin/servers/servers-query',
        method: "POST",
        data
    })
}

// 删除游戏服务器
export const deleteGameServices = (tid: number) => {
    return useHttp<IBaseResp<any>>({
        url: '/api/admin/servers/servers-remove',
        method: "GET",
        params: { tid }
    })
}