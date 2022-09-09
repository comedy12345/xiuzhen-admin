/*
 * @Description: 文件描述
 * @Author: ljf
 * @Date: 2022-08-11 09:16:46
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-09 16:24:37
 */
import { ColumnsType } from "ant-design-vue/es/table";

export const columns: ColumnsType = [
    { title: "自增编号", key: 'tid', dataIndex: 'tid', align: 'center',customFilterDropdown:true },
    { title: "伙伴名称", key: 'partnerName', dataIndex: 'partnerName', align: 'center',customFilterDropdown:true },
    { title: "所在区", key: 'domainId', dataIndex: 'domainId', align: 'center',customFilterDropdown:true },
    { title: "所属用户", key: 'userTid', dataIndex: 'userTid', align: 'center',customFilterDropdown:true },
    { title: "是否主伙伴", key: 'isMasterPartner', dataIndex: 'isMasterPartner', align: 'center' },
    { title: "是否上阵", key: 'isPlayed', dataIndex: 'isPlayed', align: 'center' },
    { title: "操作", key: 'action', dataIndex: 'action', align: 'center' },
];

