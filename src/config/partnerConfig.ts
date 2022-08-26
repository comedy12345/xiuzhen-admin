/*
 * @Description: 伙伴信息配置数据
 * @Author: ljf
 * @Date: 2022-08-11 09:16:46
 * @LastEditors: ljf
 * @LastEditTime: 2022-08-23 15:08:29
 */
import { ColumnsType } from "ant-design-vue/es/table";

export const columns: ColumnsType = [
    { title: "固定编号", key: 'sid', dataIndex: 'sid', align: 'center', width: 120, fixed: 'left', customFilterDropdown: true },
    { title: "伙伴名称", key: 'partnerName', dataIndex: 'partnerName', align: 'center', width: 120, fixed: 'left', customFilterDropdown: true },
    { title: "所在区", key: 'domainId', dataIndex: 'domainIdStr', align: 'center', width: 120, fixed: 'left', customFilterDropdown: true },
    { title: "职业", key: 'jobStr', dataIndex: 'jobStr', align: 'center', width: 100, customFilterDropdown: true },
    { title: "种族", key: 'raceStr', dataIndex: 'raceStr', align: 'center', width: 100, customFilterDropdown: true },
    { title: "血量", key: 'blood', dataIndex: 'blood', align: 'center', width: 100, },
    { title: "最大血量", key: 'maxBlood', dataIndex: 'maxBlood', align: 'center', width: 100, },
    { title: "能量", key: 'power', dataIndex: 'power', align: 'center', width: 100, },
    { title: "最大能量", key: 'maxPower', dataIndex: 'maxPower', align: 'center', width: 100, },
    { title: "修为", key: 'exp', dataIndex: 'exp', align: 'center', width: 100, },
    { title: "等级", key: 'lev', dataIndex: 'lev', align: 'center', width: 100, },
    { title: "攻击力", key: 'attack', dataIndex: 'attack', align: 'center', width: 100, },
    { title: "物防", key: 'pdef', dataIndex: 'pdef', align: 'center', width: 100, },
    { title: "法防", key: 'mdef', dataIndex: 'mdef', align: 'center', width: 100, },
    { title: "命中", key: 'hit', dataIndex: 'hit', align: 'center', width: 100, },
    { title: "闪避", key: 'dodge', dataIndex: 'dodge', align: 'center', width: 100, },
    { title: "暴击", key: 'crit', dataIndex: 'crit', align: 'center', width: 100, },
    { title: "抗暴", key: 'revolt', dataIndex: 'revolt', align: 'center', width: 100, },
    { title: "品质", key: 'quality', dataIndex: 'quality', align: 'center', width: 100, },
    { title: "进阶", key: 'steps', dataIndex: 'steps', align: 'center', width: 100, },
    { title: "飞升", key: 'fly', dataIndex: 'fly', align: 'center', width: 100, },
    { title: "轮回", key: 'lifeBack', dataIndex: 'lifeBack', align: 'center', width: 100, },
    { title: "升星", key: 'star', dataIndex: 'star', align: 'center', width: 100, },
    { title: "伙伴描述", key: 'introduce', dataIndex: 'introduce', align: 'center', width: 200, },
    { title: "操作", key: 'action', dataIndex: 'action', align: 'center', width: 200, fixed: 'right' },
];

