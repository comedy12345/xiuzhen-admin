/*
 * @Description: 伙伴信息类型
 * @Author: ljf
 * @Date: 2022-08-23 09?:42?:11
 * @LastEditors: ljf
 * @LastEditTime: 2022-08-23 11:36:53
 */
export interface IPartnerForm {
      tid?: number;
      // 伙伴名称
      partnerName?: string;
      // 攻击力
      attack?: number;
      // 血量
      blood?: number;
      // 暴击
      crit?: number;
      // 闪避
      dodge?: number;
      // 所在区
      domainId?: number;
      // 修为
      exp?: number;
      // 飞升
      fly?: string;
      // 命中
      hit?: number;
      // 伙伴介绍
      introduce?: string;
      // 职业
      job?: number;
      // 等级
      lev?: number;
      // 轮回
      lifeBack?: number;
      // 最大血量
      maxBlood?: number;
      // 能量
      power?: number;
      // 最大能量
      maxPower?: number;
      // 法防
      mdef?: number;
      // 物防
      pdef?: number;
      // 品质
      quality?: number;
      // 种族
      race?: number;
      // 抗暴
      revolt?: number;
      // 固定编号
      sid?: string;
      // 升星
      star?: number;
      // 进阶
      steps?: number;
}

export interface IPartnerList extends IPartnerForm {
      // 创建时间
      createAt?: string;
      // 创建人
      createBy?: string;
      // 更新时间
      updateAt?: string;
      // 更新人
      updateBy?: string;
}