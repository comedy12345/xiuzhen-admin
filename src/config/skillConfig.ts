import { ColumnsType } from "ant-design-vue/es/table";
export const getColumns = () => {
    return [
        {
            title: '所在区',
            key: 'domainTidStr',
            dataIndex: 'domainTidStr',
            align: 'center',
            customFilterDropdown: true,
            width: 100,
            fixed: 'left',

        },
        {
            title: '技能名称',
            key: 'skillName',
            dataIndex: 'skillName',
            align: 'center',
            customFilterDropdown: true,
            width: 120,
            fixed: 'left',
        },
        {
            title: '是被动?',
            key: 'passivityStr',
            dataIndex: 'passivityStr',
            align: 'center',
            customFilterDropdown: true,
            width: 120,
            fixed: 'left',
        },
        {
            title: '组合技能?',
            key: 'isCombineStr',
            dataIndex: 'isCombineStr',
            align: 'center',
            customFilterDropdown: true,
            width: 120,
            fixed: 'left',
        },
        {
            title: '被动触发特性',
            key: 'passivityTriggerOnTypeStr',
            dataIndex: 'passivityTriggerOnTypeStr',
            align: 'center',
            width: 120,
        },

        // {
        //     title: '组合技能的子技能列表',
        //     key: 'combine_sk_ls',
        //     dataIndex: 'combine_sk_ls'
        // },
        {
            title: '组合技出招顺序',
            key: 'combineSkOrderStr',
            dataIndex: 'combineSkOrderStr',
            align: 'center',
            width: 130,

        },
        {
            title: '消耗属性',
            key: 'expendPropStr',
            dataIndex: 'expendPropStr',
            align: 'center',
            width: 120,

        },
        {
            title: '消耗值',
            key: 'expendVal',
            dataIndex: 'expendVal',
            align: 'center',
            width: 100,

        },
        {
            title: '创建时间',
            key: 'createAt',
            dataIndex: 'createAt',
            align: 'center',
            width: 200
        },
        {
            title: '创建人',
            key: 'createBy',
            dataIndex: 'createBy',
            align: 'center',
            width: 100
        },
        {
            title: '更新时间',
            key: 'updateAt',
            dataIndex: 'updateAt',
            align: 'center',
            width: 200
        },
        {
            title: '更新人',
            key: 'updateBy',
            dataIndex: 'updateBy',
            align: 'center',
            width: 120
        },
        {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            align: 'center',
            fixed: 'right',
            width: 220
        }
    ] as ColumnsType
}

// 技能触发特性
export const passivityTriggerOnTypeDatas = [
    { label: '被攻击时', value: 1 },
    { label: '每回合触发', value: 2 },
    { label: '每秒触发', value: 3 }
]

// 子技能出招顺序
export const combineSkOrderDatas = [{ label: '随机出招', value: 1 }, { label: '顺序出招', value: 2 }]