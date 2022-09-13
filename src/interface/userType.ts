/*
 * @Description: 用户类型文件
 * @Author: ljf
 * @Date: 2022-09-09 09:37:57
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-13 15:59:56
 */
export interface IUserForm {
    tid?: number;
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
export interface IUpdPwd extends IUserForm{
    wornPasswd?:string;
    qrPwd?:string;
}