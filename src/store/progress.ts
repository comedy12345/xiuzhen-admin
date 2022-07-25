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
            this.status = false;
            this.rateOrogress! = 0;
        }
    }
})
export default useProgressStore;
