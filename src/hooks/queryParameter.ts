/*
 * @Description: 监听收集查询参数hook
 * @Author: ljf
 * @Date: 2022-07-26 09:05:35
 * @LastEditors: ljf
 * @LastEditTime: 2022-08-11 14:21:30
 */

import { IColumn, IQueryParameter } from "@/interface/types";
import { reactive, ref, watch } from "vue";

/**
 * @description: 监听收集查询参数
 * @return {*} {queryForm:"查询参数原始数据对象",queryParameterColumn:"封装后的查询参数对象"}
 * @author: ljf
 */
export default function useQueryParameter() {
    const queryForm = reactive<IQueryParameter>({});
    // 保存最新查询参数
    const queryParameterColumn = ref<IColumn[]>([]);
    watch(() => queryForm, () => {
        queryParameterColumn.value = [];
        Object.keys(queryForm).forEach(name => {
            queryForm[name] && queryParameterColumn.value.push({ func: 'eq', name, value: queryForm[name] })
        });
    }, { deep: true });
    return {
        queryForm,
        queryParameterColumn
    }
}