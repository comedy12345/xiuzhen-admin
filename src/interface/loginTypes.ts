// 登录表单类型
export interface ILoginRequest {
    userName: string,
    passwd: string
}
export interface ILoginResponse {
    token: string
}