import axios, { AxiosRequestConfig } from "axios";
import { KEY_USER_INFO_ID, IUserInfo } from "@/store/userInfo";
import { message } from 'ant-design-vue';
import { useRouter, useRoute } from "vue-router";


const requests = axios.create({
    baseURL: '/',
    timeout: 10000
});

// 请求拦截
requests.interceptors.request.use((config: AxiosRequestConfig<any>) => {
    const userInfo = JSON.parse(localStorage.getItem(KEY_USER_INFO_ID) || "{}") as IUserInfo;
    if (userInfo.token) {
        config.headers!['token'] = userInfo.token;
    }
    return config;
})

// 响应拦截
requests.interceptors.response.use((resp) => {

    const { code, msg } = resp.data;
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