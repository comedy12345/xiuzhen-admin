/*
 * @Description: 区服管理配置数据
 * @Author: ljf
 * @Date: 2022-08-11 09:16:46
 * @LastEditors: ljf
 * @LastEditTime: 2022-08-11 10:45:49
 */
import { TableColumnType } from "ant-design-vue";


// 表格字段
export const columns: TableColumnType[] = [
    {
        title: '自增编号',
        dataIndex: 'tid',
        key: 'tid',
        align: 'center'
    },
    {
        title: '区名称',
        dataIndex: 'serverName',
        key: 'serverName',
        align: 'center',
        customFilterDropdown: true,
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
        align: 'center',
        customFilterDropdown: true,

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
export const status: {
    value: number,
    text: string,
    badgeStatus: "default" | "error" | "success" | "warning" | "processing"
}[] = [
        {
            value: 0,
            text: '关闭',
            badgeStatus: 'error'
        },
        {
            value: 1,
            text: '开启',
            badgeStatus: 'success'
        },
        {
            value: 2,
            text: '更新',
            badgeStatus: 'processing'
        },
        {
            value: 3,
            text: '维护',
            badgeStatus: 'default'
        }
    ];


