import useHttp from "@/hooks/useHttp"
import { IBaseResp, ISelectDatas } from "@/interface/types"
import { Ref } from "vue"

export const queryEnums = (loading?: Ref<boolean>): Promise<IBaseResp<ISelectDatas[]>> => {
    return useHttp<IBaseResp<ISelectDatas[]>>({
        url: '/api/admin/role/skill/drop-down-list',
        method: "POST",
        loading
    })
}