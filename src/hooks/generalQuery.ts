import { IBaseQueryParameter, IColumn } from "@/interface/types";
import { ColumnType, FilterDropdownProps } from "ant-design-vue/es/table/interface";

// ant通用查询钩子
export default function (queryParameter: IBaseQueryParameter, getList: Function) {
    //查询
    const handleSearch = (props: FilterDropdownProps<ColumnType>) => {
        const { selectedKeys, confirm, column: { key } } = props;
        const columnIndex = queryParameter.columns?.findIndex(item => item.name === key);
        const column: IColumn = { func: 'eq', name: key?.toString()!, value: selectedKeys[0] };
        if (columnIndex != -1) queryParameter.columns?.splice(columnIndex!, 1, column);
        else queryParameter.columns?.push(column);
        confirm();// 这个失效了不知道为啥--所以就传入getList手动执行
    }
    // 重置
    const handleReset = (props: FilterDropdownProps<ColumnType>) => {
        const { clearFilters, column: { key } } = props;
        const columnIndex = queryParameter.columns?.findIndex(item => item.name === key);
        columnIndex !== -1 && queryParameter.columns?.splice(columnIndex!, 1);
        clearFilters && clearFilters();
        getList();
    };
    return {
        handleSearch,
        handleReset
    }
}