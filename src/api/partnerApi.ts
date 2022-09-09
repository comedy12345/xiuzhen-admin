/*
 * @Description: 伙伴信息API
 * @Author: ljf
 * @Date: 2022-08-23 10:24:34
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-09 14:52:30
 */

import useHttp from "@/hooks/useHttp";
import { IGamerPartnerList, IPartnerForm, IPartnerList } from "@/interface/partnerType";
import { ISkillList } from "@/interface/skillTypes";
import { IBaseQueryParameter, IBaseResp, IData } from "@/interface/types";
import { Ref } from "vue";

/**
 * @description: 新增伙伴信息
 * @param {IPartnerForm} data
 * @param {Ref} loading
 * @return {*}
 * @author: ljf
 */
export const savePartner = (data: IPartnerForm, loading?: Ref<boolean>): Promise<IBaseResp<any>> => {
      let url = "/api/admin/partner/partner-add";
      if (data.tid) {
            url = '/api/admin/partner/partner-update';
      }
      return useHttp<IBaseResp<any>>({
            url,
            method: "POST",
            data,
            loading
      })
}

/**
 * @description: 查询伙伴信息列表
 * @return {*}
 * @author: ljf
 */
export const queryPartners = (data: IBaseQueryParameter, loading?: Ref<boolean>)
      : Promise<IBaseResp<IData<IPartnerList[]>>> => {
      return useHttp<IBaseResp<IData<IPartnerList[]>>>({
            url: '/api/admin/partner/query',
            method: "POST",
            data,
            loading
      })
}

/**
 * @description: 查询玩家伙伴信息列表
 * @return {*}
 * @author: ljf
 */
 export const queryGamerPartners = (data: IBaseQueryParameter, loading?: Ref<boolean>)
 : Promise<IBaseResp<IData<IGamerPartnerList[]>>> => {
 return useHttp<IBaseResp<IData<IGamerPartnerList[]>>>({
       url: '/api/admin/user/partner/query',
       method: "POST",
       data,
       loading
 })
}

/**
 * @description: 删除伙伴信息
 * @param {string} tid
 * @param {Ref} loading
 * @return {*}
 * @author: ljf
 */
export const deletePartner = (tid: string, loading?: Ref<boolean>): Promise<IBaseResp<any>> => {
      return useHttp<IBaseResp<any>>({
            url: '/api/admin/partner/partner-remove',
            method: "GET",
            params: { tid },
            loading
      })
}


export const savePartnerSkill = (data: { skillSid: string, partnerSid: string }[], loading?: Ref<boolean>): Promise<IBaseResp<any>> => {
      return useHttp<IBaseResp<any>>({
            url: "/api/admin/role/skill/partner-skill-add",
            method: "POST",
            data,
            loading
      })
}

export const deleteSkill = (tid: string, loading?: Ref<boolean>): Promise<IBaseResp<any>> => {
      return useHttp<IBaseResp<any>>({
            url: '/api/admin/role/skill/partner-skill-remove',
            method: "GET",
            params: { tid },
            loading
      })
}

export const queryPartnerSkill = (tid: number, loading?: Ref<boolean>)
      : Promise<IBaseResp<ISkillList[]>> => {
      return useHttp<IBaseResp<ISkillList[]>>({
            url: '/api/admin/role/skill/partner-query-skill',
            method: "GET",
            params: { tid },
            loading
      })
}