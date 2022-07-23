import { Method } from "axios";
import request from "@/api/request";
export interface HttpConfig {
    url: string;
    method: Method;
    data?: { [key: string]: any };
    params?: { [key: string]: any };
}
const useHttp = <T>(config: HttpConfig): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        request({
            url: config.url,
            method: config.method,
            data: config.data,
            params: config.params,
        }).then((resp) => {
            resolve(resp.data);
        }).catch((err) => {
            reject(err);
        })
    })

}
export default useHttp;