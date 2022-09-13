/*
 * @Description: 技能接口类型
 * @Author: ljf
 * @Date: 2022-08-17 08:40:29
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-13 17:13:59
 */
export interface ISkillForm {
    tid?: string,
    sid?: string,
    // 技能名称
    skillName?: string;
    // 被动触发特性
    passivityTriggerOnType?: number;
    // 是否被动技能
    passivity?: number;
    // buff出招顺序
    orderIdx?: number;
    // 是否组合技能
    isCombine?: number;
    // 消耗值
    expendVal?: number;
    // 消耗属性
    expendProp?: number;
    // 所在区
    domainId?: number;
    // 组合技能子技能出招顺序
    combineSkOrder?: number;
    combineSkLs?: string,
}

export interface ISkillList {
    // 子技能列表
    combineSkLs: string;
    // 子技能出招顺序
    combineSkOrder: number;
    // 创建时间
    createAt: string;
    // 创建人
    createBy: string;
    // 所在区
    domainId: string;
    domainTidStr: string;
    // 消耗属性
    expendProp: number;
    expendPropStr: string;
    // 消耗值
    expendVal: number;
    // 是否技能组合
    isCombine: number;
    isCombineStr: string;
    // buf出招顺序
    orderIdx: number;
    orderIdxStr: string;
    // 是否被动技能
    passivity: number;
    passivityStr: string;
    // 被动触发特性
    passivityTriggerOnType: number;
    passivityTriggerOnTypeStr: string;
    //sid
    sid: string;
    // 技能名称
    skillName: string;
    // 更新时间
    updateAt: string;
    // 更新人 
    updateBy: string;
    tid: string
}