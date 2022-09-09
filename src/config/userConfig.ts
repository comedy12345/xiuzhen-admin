/*
 * @Description: 用户配置数据
 * @Author: ljf
 * @Date: 2022-08-11 09:16:46
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-09 10:33:12
 */
import { ColumnsType } from "ant-design-vue/es/table";

export const columns = ():ColumnsType => {
    return [
        { title: "自增编号", key: 'tid', dataIndex: 'tid', align: 'center' },
        { title: "用户账号", key: 'userName', dataIndex: 'userName', align: 'center' ,customFilterDropdown:true},
        { title: "手机", key: 'phone', dataIndex: 'phone', align: 'center',customFilterDropdown:true },
        { title: "用户类型", key: 'type', dataIndex: 'type', align: 'center' ,customFilterDropdown:true},
        { title: "状态", key: 'state', dataIndex: 'state', align: 'center' ,customFilterDropdown:true},
        { title: "最后一次登录时间", key: 'lastLoginTime', dataIndex: 'lastLoginTime', align: 'center' },
        { title: "操作", key: 'action', dataIndex: 'action', align: 'center' },
    ];
} 
