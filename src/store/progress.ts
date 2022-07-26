/*
 * @Description: 进度条状态
 * @Author: ljf
 * @Date: 2022-07-26 09:05:35
 * @LastEditors: ljf
 * @LastEditTime: 2022-07-26 10:10:53
 */

import { defineStore } from 'pinia';
export interface IProgress {
    status?: boolean,
    rateOrogress?: number,
}
export const KEY_USER_INFO_ID = 'progress';
const useProgressStore = defineStore({
    id: KEY_USER_INFO_ID,
    state: (): IProgress => ({
        status: false,
        rateOrogress: 0,
    }),
    actions: {
        startProgress(flag: boolean) {
            if (flag) {
                this.status = true;
                this.rateOrogress = 0;
            }
            if (this.rateOrogress! >= 80) {
                return;
            }
            setTimeout(() => {
                this.rateOrogress! += 0.1;
                this.startProgress(false);
            }, 1);
        },
        endProgress() {
            this.rateOrogress! = 100;
            setTimeout(() => {
                this.status = false;
                this.rateOrogress! = 0;
            }, 500);

        }
    }
})
export default useProgressStore;
