import { ColumnsType } from "ant-design-vue/es/table";

export const columns: ColumnsType = [
    { title: "自增编号", key: 'tid', dataIndex: 'tid', align: 'center' },
    { title: "固定编号", key: 'sid', dataIndex: 'sid', align: 'center' },
    { title: "伙伴名称", key: 'partner_name', dataIndex: 'partner_name', align: 'center' },
    { title: "血量", key: 'blood', dataIndex: 'blood', align: 'center' },
    { title: "最大血量", key: 'max_blood', dataIndex: 'max_blood', align: 'center' },
    { title: "能量", key: 'power', dataIndex: 'power', align: 'center' },
    { title: "最大能量", key: 'max_power', dataIndex: 'max_power', align: 'center' },
    { title: "修为", key: 'exp', dataIndex: 'exp', align: 'center' },
    { title: "等级", key: 'lev', dataIndex: 'lev', align: 'center' },
    { title: "攻击力", key: 'attack', dataIndex: 'attack', align: 'center' },
    { title: "物防", key: 'pdef', dataIndex: 'pdef', align: 'center' },
    { title: "法防", key: 'mdef', dataIndex: 'mdef', align: 'center' },
    { title: "命中", key: 'hit', dataIndex: 'hit', align: 'center' },
    { title: "闪避", key: 'dodge', dataIndex: 'dodge', align: 'center' },
    { title: "暴击", key: 'crit', dataIndex: 'crit', align: 'center' },
    { title: "抗暴", key: 'revolt', dataIndex: 'revolt', align: 'center' },
    { title: "品质", key: 'quality', dataIndex: 'quality', align: 'center' },
    { title: "进阶", key: 'steps', dataIndex: 'steps', align: 'center' },
    { title: "职业", key: 'job', dataIndex: 'job', align: 'center' },
    { title: "种族", key: 'race', dataIndex: 'race', align: 'center' },
    { title: "飞升", key: 'fly', dataIndex: 'fly', align: 'center' },
    { title: "轮回", key: 'life_back', dataIndex: 'life_back', align: 'center' },
    { title: "升星", key: 'star', dataIndex: 'star', align: 'center' },
    { title: "所在区", key: 'domain_tid', dataIndex: 'domain_tid', align: 'center' },
    { title: "操作", key: 'action', dataIndex: 'action', align: 'center' },
];

export const dataSource = [
    {
        tid: '1',
        sid: '111',
        partner_name: '啦啦啦',
        blood: '123',
        max_blood: '123',
        power: '1',
        max_power: '1',
        exp: '1',
        lev: '1',
        attack: '1',
        pdef: '1',
        mdef: '1',
        hit: '1',
        dodge: '1',
        crit: '1',
        revolt: '1',
        quality: '1',
        steps: '1',
        job: '1',
        race: '1',
        fly: '1',
        life_back: '1',
        star: '1',
        domain_tid: '1',
        action: '一区'
    },
]


export const skillColumns: ColumnsType = [
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


export const skillDataSource = [
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
]
