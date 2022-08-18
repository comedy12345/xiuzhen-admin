import useHttp from "@/hooks/useHttp";
import { ISkillForm, ISkillList } from "@/interface/skillTypes";
import { IBaseQueryParameter, IBaseResp, IData } from "@/interface/types";
import { Ref } from "vue";

export const saveSkill = (data: ISkillForm, loading?: Ref<boolean>): Promise<IBaseResp<any>> => {
    let url = "/api/admin/role/skill/skill-add";
    if (data.tid) {
        url = '/api/admin/role/skill/skill-update';
    }
    return useHttp<IBaseResp<any>>({
        url,
        method: "POST",
        data,
        loading
    })
}


export const querySkills = (data: IBaseQueryParameter, loading?: Ref<boolean>)
    : Promise<IBaseResp<IData<ISkillList[]>>> => {
    return useHttp<IBaseResp<IData<ISkillList[]>>>({
        url: '/api/admin/role/skill/skill-query',
        method: "POST",
        data,
        loading
    })
}


export const deleteSkill = (tid: string, loading?: Ref<boolean>): Promise<IBaseResp<any>> => {
    return useHttp<IBaseResp<any>>({
        url: '/api/admin/role/skill/skill-remove',
        method: "GET",
        params: { tid },
        loading
    })
}

export const getSkillById = (tid: string, loading?: Ref<boolean>): Promise<IBaseResp<ISkillForm>> => {
    return useHttp<IBaseResp<ISkillForm>>({
        url: '/api/admin/role/skill/get-skill-info',
        method: "POST",
        data: { tid },
        loading
    })
}

export const getChildSkill = (data: IBaseQueryParameter, loading?: Ref<boolean>): Promise<IBaseResp<IData<ISkillList[]>>> => {
    return useHttp<IBaseResp<IData<ISkillList[]>>>({
        url: '/api/admin/role/skill/son-skill-query-by-tid',
        method: "POST",
        data,
        loading
    })
}

export const getSkilldd = (data: { tid: string }, loading?: Ref<boolean>): Promise<IBaseResp<ISkillList[]>> => {
    return useHttp<IBaseResp<ISkillList[]>>({
        url: '/api/admin/role/skill/sadd-skill-list-query',
        method: "POST",
        data,
        loading
    })
}

