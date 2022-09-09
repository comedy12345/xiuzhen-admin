/*
 * @Description: 游戏服务类型
 * @Author: ljf
 * @Date: 2022-08-11 09:16:46
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-09 09:56:32
 */
// 编辑游戏服务
export interface IGameServicesForm {
    tid?: number;
    parentTid?: number;
    serverName?: string;
    // 状态 默认1 开启 0 关闭 2 更新 3维护
    stat?: number;
}

// 所在区
export interface IDomain{
    domainName:string,
    parentTid:number,
    serverName:string,
    tid:number;
}

// 游戏服务列表
export interface IGameServicesList {
    // 自增ID
    tid?: number;
    // 服务器名/区名
    serverName?: string;
    // 状态 默认1 开启 0 关闭 2 更新 3维护
    stat?: number;
    // 父级服务器id
    parentTid?: number;
    // 创建时间
    createAt?: string;
    // 修改时间
    updateAt?: string;
    // 创建人
    createBy?: string;
    // 修改人
    updateBy?: string;

    children?: IGameServicesList[]

}

