/*
 * @Description: 面包屑进入导航，和关闭面包屑Hook
 * @Author: ljf
 * @Date: 2022-07-13 17:07:44
 * @LastEditors: ljf
 * @LastEditTime: 2022-07-26 10:41:46
 */

import { useRouteHistoryStore } from "@/store/routeHistory";
import { useRoute, useRouter } from "vue-router";
/**
 * @description: 返回面包屑需要的方法
 * @return {*}
 * @author: ljf
 */
export function useLayout() {
      const route = useRoute();
      const router = useRouter();
      let { $state: state } = useRouteHistoryStore();
      const routerLinkHander = (path: string) => {
            return () => {
                  router.push(path);
            }
      }
      const removeRouteHistory = (id: string) => {
            return () => {
                  state.routeHistorys = state.routeHistorys.filter((item: { id: string; }) => item.id !== id)
            }
      }
      return {
            route,
            router,
            state,
            routerLinkHander,
            removeRouteHistory,
      }
}