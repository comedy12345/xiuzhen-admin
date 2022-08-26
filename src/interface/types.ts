/*
 * @Description: 通用类型文件
 * @Author: ljf
 * @Date: 2022-07-26 09:05:35
 * @LastEditors: ljf
 * @LastEditTime: 2022-07-26 10:15:31
 */


export interface IBaseResp<T> {
    code: number,
    msg: string,
    data: T
}
export interface IData<T> {
    countId?: number;

    // 当前页
    current?: number;

    maxLimit?: number;
    // 总页数
    pages?: number;

    // 数据
    records: T;

    // 每页展示条数
    size?: number;
    // 总条数
    total?: number;

}

// 通用查询参数
export interface IBaseQueryParameter {

    // 当前页
    current?: number;

    // 每页展示条数
    size?: number;

    // 查询字段数组
    columns?: IColumn[];

    // 排序字段
    orderBy?: IOrderBy[];
}

// 排序字段
export interface IOrderBy {

    // 排序方向
    asc: boolean;

    // 排序字段数组
    fields: string;
}

// 查询字段
export interface IColumn {
    // 查询类型，like模糊查询，eq精确查询
    func: string;

    // 查询字段名
    name: string;

    // 查询内容
    value: any;

}

// 用于查询字段v-model
export interface IQueryParameter {
    [key: string]: number;
}

// 下拉框数据
export interface ISelectDatas {
    type: number;
    selectOptionVoList: ISelectOptionVoList[]
}
export interface ISelectOptionVoList {
    name: string;
    val: number;
    label: string;
    value: number;
}
