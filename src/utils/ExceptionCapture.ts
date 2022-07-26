import { Ref } from "vue";
import { message } from "ant-design-vue";

// 捕获请求失败异常
export const runRequst = async (fn: Function, loading?: Ref<boolean> | null, ...fnArgs: any) => {

    try {
        loading && (loading.value = true);
        await fn(...fnArgs);
        loading && (loading.value = false);
    } catch (error: any) {
        loading && (loading.value = false);
    } finally {
        loading && (loading.value = false);
    }

}