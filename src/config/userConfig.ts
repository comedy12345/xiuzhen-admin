import { ColumnsType } from "ant-design-vue/es/table";

export const columns: ColumnsType = [
    { title: "自增编号", key: 'tid', dataIndex: 'tid', align: 'center' },
    { title: "用户账号", key: 'userName', dataIndex: 'userName', align: 'center' },
    { title: "手机", key: 'phone', dataIndex: 'phone', align: 'center' },
    { title: "用户类型", key: 'type', dataIndex: 'type', align: 'center' },
    { title: "状态", key: 'state', dataIndex: 'state', align: 'center' },
    { title: "最后一次登录时间", key: 'lastLoginTime', dataIndex: 'lastLoginTime', align: 'center' },
    { title: "操作", key: 'action', dataIndex: 'action', align: 'center' },
];
