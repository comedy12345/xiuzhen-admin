/*
 * @Description: 当前打开的tag
 * @Author: ljf
 * @Date: 2022-07-13 17:07:45
 * @LastEditors: ljf
 * @LastEditTime: 2022-08-17 16:28:43
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