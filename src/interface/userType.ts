export interface IUserForm {
    tid?: string;
    // 用户名
    userName?: string;
    // 密码
    passwd?: string;
    // 手机
    phone?: number;
    // 用户类型
    type?: string;
    // 状态
    state?: number;
}

export interface IUserList extends IUserForm {
    lastLoginTime: string;
}