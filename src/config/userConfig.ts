import { ColumnsType } from "ant-design-vue/es/table";

export const columns: ColumnsType = [
    { title: "自增编号", key: 'tid', dataIndex: 'tid', align: 'center' },
    { title: "用户权限类型", key: 'type', dataIndex: 'type', align: 'center' },
    { title: "用户账号", key: 'user_name', dataIndex: 'user_name', align: 'center' },
    { title: "用户密码", key: 'passwd', dataIndex: 'passwd', align: 'center' },
    { title: "手机号", key: 'phone', dataIndex: 'phone', align: 'center' },
    { title: "最后一次登录时间", key: 'last_login_time', dataIndex: 'last_login_time', align: 'center' },

    { title: "操作", key: 'action', dataIndex: 'action', align: 'center' },
];

export const dataSource = [
    {
        tid: '1',
        type: '玩家',
        user_name: '123',
        passwd: '123',
        phone: '123',
        last_login_time: '2022-01-01',
    },
    {
        tid: '2',
        type: '管理员',
        user_name: '111',
        passwd: '111',
        phone: '111',
        last_login_time: '2022-01-01',
    },
    {
        tid: '3',
        type: '代练',
        user_name: '222',
        passwd: '222',
        phone: '222',
        last_login_time: '2022-01-01',
    }
]