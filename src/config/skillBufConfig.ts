import { ColumnsType } from "ant-design-vue/es/table";

export const columns: ColumnsType = [
    { title: "所在区", key: 'domain_tid', dataIndex: 'domain_tid', align: 'center' },
    { title: "所属技能", key: 'skill_sid', dataIndex: 'skill_sid', align: 'center' },
    { title: "技能特性", key: 'buf_type', dataIndex: 'buf_type', align: 'center' },
    { title: "触发几率", key: 'trigger_odds', dataIndex: 'trigger_odds', align: 'center' },
    { title: "执行结果", key: 'result_type', dataIndex: 'result_type', align: 'center' },
    { title: "输出参考", key: 'ref_target', dataIndex: 'ref_target', align: 'center' },
    { title: "变化类型", key: 'change_type', dataIndex: 'change_type', align: 'center' },
    { title: "变化值", key: 'change_val', dataIndex: 'change_val', align: 'center' },
    { title: "变化值变化类型", key: 'change_val_type', dataIndex: 'change_val_type', align: 'center' },
    { title: "作用范围", key: 'find_domain', dataIndex: 'find_domain', align: 'center' },
    { title: "作用时属性检测", key: 'find_prop', dataIndex: 'find_prop', align: 'center' },
    { title: "作用时最小数量", key: 'find_num_min', dataIndex: 'find_num_min', align: 'center' },
    { title: "作用时最大数量", key: 'find_num_max', dataIndex: 'find_num_max', align: 'center' },
    { title: "作用周期", key: 'cycle', dataIndex: 'cycle', align: 'center' },
    { title: "作用周期类型", key: 'cycle_type', dataIndex: 'cycle_type', align: 'center' },
    { title: "操作", key: 'action', dataIndex: 'action', align: 'center' },
];

export const dataSource = [
    {
        domain_tid: '一区',
        skill_sid: '排山倒海',
        buf_type: '物攻',
        trigger_odds: '100.00',
        result_type: '1111',
        ref_target: '暴击',
        change_type: '增加',
        change_val: '1000',
        change_val_type: '百分比',
        find_domain: '敌方所有人',
        find_prop: '直接触发',
        find_num_min: '1',
        find_num_max: '100',
        cycle: '1',
        cycle_type: '回合'
    }
]