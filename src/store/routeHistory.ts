/*
 * @Description: 存储路由历史和当前打开路由
 * @Author: ljf
 * @Date: 2022-07-13 17:07:45
 * @LastEditors: ljf
 * @LastEditTime: 2022-07-26 10:09:40
 */

import { defineStore } from 'pinia';
import { Key } from "ant-design-vue/lib/vc-table/interface";

const routeHistorys: IrouteHistory[] = [];
const selectdOpenKeys: Key[] = JSON.parse(sessionStorage.getItem('selectdOpenKeys')!) || [];

export const useRouteHistoryStore = defineStore('routeHistory', {
      state() {
            return {
                  routeHistorys,
                  selectdOpenKeys
            }
      },
      actions: {
            editSelectdOpenKeys(newVal: Key[], type: string) {
                  if (type === 'upd') this.selectdOpenKeys = newVal;
                  else if (type === 'add') {
                        this.selectdOpenKeys.find(item => item === newVal[0]) || this.selectdOpenKeys.push(...newVal);
                  };
                  sessionStorage.setItem('selectdOpenKeys', JSON.stringify(this.selectdOpenKeys));
            }
      }
})
export interface IrouteHistory {
      id: string,
      name: string,
      path: string,
}