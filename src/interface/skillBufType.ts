
// 下拉框数据
export interface ISelectDatas {
    type: number;
    selectOptionVoList: ISelectOptionVoList[]
}
export interface ISelectOptionVoList {
    name: string;
    val: number;
    label: string;
    value: number;
}

export interface ISkillBufForm {
    // 技能特性
    bufType?: number;
    // 变化类型
    changeType?: number;
    // 变化值
    changeVal?: number;
    // 变化值变化类型
    changeValType?: number;
    // 作用周期
    cycle?: number;
    // 作用周期类型
    cycleType?: number;
    // 所在区
    domainId?: string;
    // 作用范围
    findDomain?: number;
    // 作用时最大数量
    findNumMax?: number;
    // 作用时最小数量
    findNumMin?: number;
    // 作用时属性检测
    findProp?: number;
    // 出招顺序
    orderIdx?: number;
    // 输出参考
    refTarget?: string;
    // 执行结果
    resultType?: number;
    // 固定值
    sid?: string;
    // 固定技能sid  
    skillSid?: string;
    tid?: string;
    // 触发机率
    triggerOdds?: number;
    // 追加技能
    saddRef?: string;
}

export interface ISkillBufList extends ISkillBufForm {
    // 创建时间
    createAt: string;
    // 创建人
    createBy: string;
    // 更新时间
    updateAt: string;
    // 更新人
    updateBy: string;
    bufTypeStr: string;
    changeValTypeStr: string;
    cycleTypeStr: string;
    findDomainStr: string;
    findPropStr: string;
    refTargetStr: string;
    resultTypeStr: string;
    changeTypeStr: string;
}