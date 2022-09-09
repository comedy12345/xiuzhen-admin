/*
 * @Description: 自定义搜索通用收集查询参数，并请求
 * @Author: ljf
 * @Date: 2022-08-11 09:16:46
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-09 10:36:42
 */
import { IBaseQueryParameter, IColumn } from "@/interface/types";
import { ColumnType, FilterDropdownProps } from "ant-design-vue/es/table/interface";

// ant通用查询钩子
export default function (queryParameter: IBaseQueryParameter, getList?: Function) {

    //查询
    const handleSearch = (props: FilterDropdownProps<ColumnType>) => {
        const { selectedKeys, confirm, column: { key } } = props;
        const keySp = key?.toString().split('Str')[0];
        const columnIndex = queryParameter.columns?.findIndex(item => item.name === keySp);
        const column: IColumn = { func: 'like', name: keySp!, value: selectedKeys[0] };
        if (columnIndex != -1) queryParameter.columns?.splice(columnIndex!, 1, column);
        else queryParameter.columns?.push(column);
        confirm();
        getList && getList();
    }
    // 重置
    const handleReset = (props: FilterDropdownProps<ColumnType>) => {
        const { clearFilters, column: { key }, confirm } = props;
        const keySp = key?.toString().split('Str')[0]
        const columnIndex = queryParameter.columns?.findIndex(item => item.name === keySp);
        columnIndex !== -1 && queryParameter.columns?.splice(columnIndex!, 1);
        clearFilters && clearFilters();
        confirm();
        getList && getList();
    };
    return {
        handleSearch,
        handleReset
    }
}