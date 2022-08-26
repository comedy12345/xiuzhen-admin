import useHttp from "@/hooks/useHttp"
import { ISkillBufForm, ISkillBufList } from "@/interface/skillBufType"
import { IBaseQueryParameter, IBaseResp, IData } from "@/interface/types"
import { Ref } from "vue"




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
        url: '/api/admin/role/skill/skill-bufs-query',
        method: "POST",
        data,
        loading
    })
}

export const deleteSkillBuf = (tid: string, loading?: Ref<boolean>): Promise<IBaseResp<any>> => {
    return useHttp<IBaseResp<any>>({
        url: '/api/admin/role/skill/skill-bufs-remove',
        method: "GET",
        params: { tid },
        loading
    })
}
