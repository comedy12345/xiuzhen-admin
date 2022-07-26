/*
 * @Description: 监听收集查询参数hook
 * @Author: ljf
 * @Date: 2022-07-26 09:05:35
 * @LastEditors: ljf
 * @LastEditTime: 2022-07-26 10:34:19
 */

import { IColumns, IQueryParameter } from "@/api/types";
import { reactive, ref, watch } from "vue";

/**
 * @description: 监听收集查询参数
 * @return {*} {queryForm:"查询参数原始数据对象",queryParameterColumn:"封装后的查询参数对象"}
 * @author: ljf
 */
export default function useQueryParameter() {
    const queryForm = reactive<IQueryParameter>({});
    // 保存最新查询参数
    const queryParameterColumn = ref<IColumns[]>([]);
    watch(() => queryForm, () => {
        queryParameterColumn.value = [];
        Object.keys(queryForm).forEach(name => {
            queryParameterColumn.value.push({ func: 'eq', name, value: queryForm[name] })
        });
    }, { deep: true });
    return {
        queryForm,
        queryParameterColumn
    }
}