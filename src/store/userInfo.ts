/*
 * @Description: 保存用户信息
 * @Author: ljf
 * @Date: 2022-07-26 09:05:35
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-13 16:52:46
 */

import { defineStore } from 'pinia';
import pinia from "@/store/store";

export interface IUserInfo {
    userName?: string,
    passwd?: string,
    lastLoginTime?:string,
    phone?:string,
    power?:string,
    state?:string,
    tid?:number,
    type?:string,
    token?: string,
}
export const KEY_USER_INFO_ID = 'userInfo';
const useUserInfoStore = defineStore({
    id: KEY_USER_INFO_ID,
    state: (): IUserInfo => ({}),
    actions: {
        setToken(token: string) {
            this.$state.token = token;
        },
        login(userInfo: IUserInfo) {
            this.$state = {
                ...this.$state,
                ...userInfo
            }
        },
    }
})

const instance = useUserInfoStore(pinia);

// 订阅
instance.$subscribe((mutation, state) => {
    localStorage.setItem(instance.$id, JSON.stringify(state));
})


// 初始化
const val = localStorage.getItem(instance.$id);
if (val) {
    instance.login(JSON.parse(val));
}
export default useUserInfoStore;
