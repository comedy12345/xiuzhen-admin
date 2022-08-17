/*
 * @Description: 技能buf配置数据
 * @Author: ljf
 * @Date: 2022-08-11 09:16:46
 * @LastEditors: ljf
 * @LastEditTime: 2022-08-17 11:34:26
 */
import { ColumnsType } from "ant-design-vue/es/table";

export const columns: ColumnsType = [
    // { title: "所在区", key: 'domainId', dataIndex: 'domainId', align: 'center' },
    { title: "固定值", key: 'sid', dataIndex: 'sid', align: 'center', width: 100, fixed: 'left', customFilterDropdown: true, },
    { title: "所属技能", key: 'skillSid', dataIndex: 'skillSid', align: 'center', width: 200, fixed: 'left' },
    { title: "buf特性", key: 'bufTypeStr', dataIndex: 'bufTypeStr', align: 'center', width: 120, customFilterDropdown: true, },
    { title: "出招顺序", key: 'orderIdxStr', dataIndex: 'orderIdxStr', align: 'center', width: 100, },
    { title: "触发几率", key: 'triggerOdds', dataIndex: 'triggerOdds', align: 'center', width: 100, },
    { title: "执行结果", key: 'resultTypeStr', dataIndex: 'resultTypeStr', align: 'center', width: 120, customFilterDropdown: true, },
    { title: "输出参考", key: 'refTargetStr', dataIndex: 'refTargetStr', align: 'center', width: 120, },
    { title: "变化类型", key: 'changeTypeStr', dataIndex: 'changeTypeStr', align: 'center', width: 120, customFilterDropdown: true, },
    { title: "变化值", key: 'changeVal', dataIndex: 'changeVal', align: 'center', width: 100, },
    { title: "变化值变化类型", key: 'changeValTypeStr', dataIndex: 'changeValTypeStr', align: 'center', width: 200, customFilterDropdown: true, },
    { title: "作用范围", key: 'findDomainStr', dataIndex: 'findDomainStr', align: 'center', width: 120, customFilterDropdown: true, },
    { title: "作用时属性检测", key: 'findPropStr', dataIndex: 'findPropStr', align: 'center', width: 200, customFilterDropdown: true, },
    { title: "作用时最小数量", key: 'findNumMin', dataIndex: 'findNumMin', align: 'center', width: 200, },
    { title: "作用时最大数量", key: 'findNumMax', dataIndex: 'findNumMax', align: 'center', width: 200, },
    { title: "作用周期", key: 'cycle', dataIndex: 'cycle', align: 'center', width: 100, },
    { title: "作用周期类型", key: 'cycleTypeStr', dataIndex: 'cycleTypeStr', align: 'center', width: 200, customFilterDropdown: true, },
    { title: "创建时间", key: 'createAt', dataIndex: 'createAt', align: 'center', width: 200, },
    { title: "创建人", key: 'createBy', dataIndex: 'createBy', align: 'center', width: 100, },
    { title: "更新时间", key: 'updateAt', dataIndex: 'updateAt', align: 'center', width: 200, },
    { title: "更新人", key: 'updateBy', dataIndex: 'updateBy', align: 'center', width: 100, },
    { title: "操作", key: 'action', dataIndex: 'action', align: 'center', width: 100, fixed: 'right' },
];




