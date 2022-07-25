import { Ref } from "vue";
import { message } from "ant-design-vue";
import useProgressStore from '@/store/progress';
const progressStore = useProgressStore();

// 捕获请求失败异常
export const runRequst = async (fn: Function, loading?: Ref<boolean> | null, ...fnArgs: any) => {

    try {
        loading && (loading.value = true);
        await fn(...fnArgs);
        loading && (loading.value = false);
    } catch (error: any) {
        progressStore.endProgress();
        loading && (loading.value = false);
    } finally {
        loading && (loading.value = false);
        progressStore.endProgress();
    }

}