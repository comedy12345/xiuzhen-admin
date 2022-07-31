import { ColumnsType } from "ant-design-vue/lib/table/Table";

// 表格字段
export const columns: ColumnsType<any> | undefined = [
    {
        title: '自增编号',
        dataIndex: 'tid',
        key: 'tid',
        align: 'center'
    },
    {
        title: '服务器/区名称',
        dataIndex: 'serverName',
        key: 'serverName',
        align: 'center'
    },
    {
        title: '父级服务',
        dataIndex: 'parentTid',
        key: 'parentTid',
        align: 'center',
        width: 150
    },
    {
        title: '状态',
        dataIndex: 'stat',
        key: 'stat',
        align: 'center'
    },
    {
        title: '创建时间',
        dataIndex: 'createAt',
        key: 'createAt',
        align: 'center',
        width: 150
    },
    {
        title: '修改时间',
        dataIndex: 'updateAt',
        key: 'updateAt',
        align: 'center',
        width: 150
    },
    {
        title: '创建人',
        dataIndex: 'createBy',
        key: 'createBy',
        align: 'center',
        width: 70
    },
    {
        title: '修改人',
        dataIndex: 'updateBy',
        key: 'updateBy',
        align: 'center'
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        width: 100
    },
];
// 状态下拉框
export const status = [
    {
        value: 0,
        text: '关闭'
    },
    {
        value: 1,
        text: '开启'
    },
    {
        value: 2,
        text: '更新'
    },
    {
        value: 3,
        text: '维护'
    }
];


