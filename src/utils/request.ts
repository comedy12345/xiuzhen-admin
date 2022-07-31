/*
 * @Description: 统一请求示例，请求拦截
 * @Author: ljf
 * @Date: 2022-07-26 09:05:35
 * @LastEditors: ljf
 * @LastEditTime: 2022-07-26 10:16:28
 */

import axios, { AxiosRequestConfig } from "axios";
import { KEY_USER_INFO_ID, IUserInfo } from "@/store/userInfo";
import { message } from 'ant-design-vue';
import useProgressStore from "@/store/progress";

const progressStore = useProgressStore();
const requests = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000
});

// 请求拦截
requests.interceptors.request.use((config: AxiosRequestConfig<any>) => {
    progressStore.startProgress(true);
    const userInfo = JSON.parse(localStorage.getItem(KEY_USER_INFO_ID) || "{}") as IUserInfo;
    if (userInfo.token) {
        config.headers!['token'] = userInfo.token;
    }
    return config;
})

// 响应拦截
requests.interceptors.response.use((resp: { data: { code: number; msg: string; }; }) => {
    const { code, msg } = resp.data;
    progressStore.endProgress();
    if (code === 1) {
        return Promise.resolve(resp);
    }
    if (code === 0) {
        message.error(msg);
        return Promise.reject(msg);
    }
    if (code === 2) {
        message.error('未登录');
        location.reload();
        return Promise.reject(msg);
    }

})
export default requests;