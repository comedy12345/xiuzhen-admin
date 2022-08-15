import useHttp from "@/hooks/useHttp"
import { ISelectDatas, ISkillBufForm, ISkillBufList } from "@/interface/skillBufType"
import { IBaseQueryParameter, IBaseResp, IData } from "@/interface/types"
import { Ref } from "vue"

export const queryBufTypeEnums = (loading?: Ref<boolean>): Promise<IBaseResp<ISelectDatas[]>> => {
    return useHttp<IBaseResp<ISelectDatas[]>>({
        url: '/api/admin/role/skill/drop-down-list',
        method: "POST",
        loading
    })
}


export const saveBuf = (data: ISkillBufForm, loading?: Ref<boolean>): Promise<IBaseResp<string>> => {
    let url = '/api/admin/role/skill/skill-bufs-add';
    if (data.tid) {
        url = '/api/admin/role/skill/skill-bufs-update';
    }
    return useHttp<IBaseResp<string>>({
        url,
        method: "POST",
        data,
        loading
    })
}

export const querySkillBufs = (data: IBaseQueryParameter, loading?: Ref<boolean>)
    : Promise<IBaseResp<IData<ISkillBufList[]>>> => {
    return useHttp<IBaseResp<IData<ISkillBufList[]>>>({
        url: '/api/admin/role/skill/query',
        method: "POST",
        data,
        loading
    })
}