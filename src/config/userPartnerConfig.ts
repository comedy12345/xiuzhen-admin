import { ColumnsType } from "ant-design-vue/es/table";

export const columns: ColumnsType = [
    { title: "自增编号", key: 'tid', dataIndex: 'tid', align: 'center' },
    { title: "所在区", key: 'domain_tid', dataIndex: 'domain_tid', align: 'center' },
    { title: "所属用户", key: 'user_tid', dataIndex: 'user_tid', align: 'center' },
    { title: "是否用户主伙伴", key: 'is_master_partner', dataIndex: 'is_master_partner', align: 'center' },
    { title: "是否上阵", key: 'is_played', dataIndex: 'is_played', align: 'center' },

];

export const dataSource = [
    {
        tid: '1',
        user_tid: '1111111',
        is_master_partner: '是',
        is_played: '是',
        domain_tid: '一区',
    },
    {
        tid: '2',
        user_tid: '1111111',
        is_master_partner: '否',
        is_played: '是',
        domain_tid: '一区',
    },
    {
        tid: '3',
        user_tid: '1111111',
        is_master_partner: '是',
        is_played: '是',
        domain_tid: '二区',
    },
    {
        tid: '4',
        user_tid: '1111111',
        is_master_partner: '否',
        is_played: '是',
        domain_tid: '二区',
    },
]