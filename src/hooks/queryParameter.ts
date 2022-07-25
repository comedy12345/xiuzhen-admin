/**
 * 收集搜索字段hook
 */

import { IColumns, IQueryParameter } from "@/api/types";
import { reactive, ref, watch } from "vue";


export default function useQueryParameter() {
    const queryForm = reactive<IQueryParameter>({});
    // 保存最新查询参数
    const queryParameterColumn = ref<IColumns[]>([]);
    watch(() => queryForm, () => {
        queryParameterColumn.value = [];
        const keys = Object.keys(queryForm);
        const values = Object.values(queryForm);
        for (let index = 0; index < keys.length; index++) {
            const name = keys[index];
            const value = values[index];
            queryParameterColumn.value.push({ func: 'eq', name, value })
        }
    }, { deep: true });
    return {
        queryForm,
        queryParameterColumn
    }
}