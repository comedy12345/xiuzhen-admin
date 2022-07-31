import { ColumnsType } from "ant-design-vue/es/table";

export const columns: ColumnsType = [
    {
        title: '所在区',
        key: 'domain_tid',
        dataIndex: 'domain_tid',
        align: 'center'

    },
    {
        title: '技能名称',
        key: 'skill_name',
        dataIndex: 'skill_name',
        align: 'center'
    },
    {
        title: '是否被动技能',
        key: 'passivity',
        dataIndex: 'passivity',
        align: 'center'
    },
    {
        title: '被动触发特性',
        key: 'passivity_trigger_on_type',
        dataIndex: 'passivity_trigger_on_type',
        align: 'center'
    },
    {
        title: '是否是组合技能',
        key: 'is_combine',
        dataIndex: 'is_combine',
        align: 'center'
    },
    // {
    //     title: '组合技能的子技能列表',
    //     key: 'combine_sk_ls',
    //     dataIndex: 'combine_sk_ls'
    // },
    {
        title: '组合技子技能出招顺序',
        key: 'combine_sk_order',
        dataIndex: 'combine_sk_order',
        align: 'center'
    },
    {
        title: '消耗属性',
        key: 'expend_prop',
        dataIndex: 'expend_prop',
        align: 'center'
    },
    {
        title: '消耗值',
        key: 'expend_val',
        dataIndex: 'expend_val',
        align: 'center'
    },
    {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        align: 'center'
    }
];


export const dataSource = [
    {
        tid: '1',
        domain_tid: '一区',
        skill_name: '排山倒海',
        passivity: '是',
        passivity_trigger_on_type: '每秒触发',
        is_combine: true,
        combine_sk_ls: '111111',
        combine_sk_order: '随机出招',
        expend_prop: '消耗体力',
        expend_val: '100'
    },
    {
        tid: '2',
        domain_tid: '一区',
        skill_name: '排山倒海111',
        passivity: '是',
        passivity_trigger_on_type: '每秒触发',
        is_combine: false,
        combine_sk_ls: '111111',
        combine_sk_order: '随机出招',
        expend_prop: '消耗体力',
        expend_val: '100'
    }
].map(item => {
    item.is_combine && ((item as any).children = [])
    return item;
})
