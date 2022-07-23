export interface IBaseResp<T> {
    code: number,
    msg: string,
    data: T
}
export interface IData<T> {
    countId?: number;

    // 当前页
    current?: number;

    maxLimit: number;
    // 总页数
    pages?: number;

    // 数据
    records: T;

    // 每页展示条数
    size?: number;
    // 总条数
    total?: number;

}