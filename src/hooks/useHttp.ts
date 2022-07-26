/*
 * @Description: 封装请求hook,定义返回类型和请求参数类型
 * @Author: ljf
 * @Date: 2022-07-26 09:05:35
 * @LastEditors: ljf
 * @LastEditTime: 2022-07-26 10:53:50
 */

import { Method } from "axios";
import request from "@/api/request";
import { Ref } from "vue";
export interface HttpConfig {
    url: string;
    method: Method;
    data?: { [key: string]: any };
    params?: { [key: string]: any };
    // 需要开启的loading
    loading?: Ref<boolean>
}

/**
 * @description: HTTP请求hook,使用泛型定义返回的数据类型,使用接口定义请求参数
 * @param {HttpConfig} config  
 * @return {*} Promise<T>
 * @author: ljf
 */
const useHttp = <T>(config: HttpConfig): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        config.loading && (config.loading.value = true);
        request({
            url: config.url,
            method: config.method,
            data: config.data,
            params: config.params,
        }).then((resp: { data: T | PromiseLike<T>; }) => {
            config.loading && (config.loading.value = false);
            resolve(resp.data);
        }).catch((err: any) => {
            config.loading && (config.loading.value = false);
            reject(err);
        })
    })

}
export default useHttp;