/*
 * @Description: 路由拦截器
 * @Author: ljf
 * @Date: 2022-07-13 17:07:44
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-14 11:20:41
 */

import { router } from '@/route';
import { useRouteHistoryStore } from "@/store/routeHistory";
import useUserInfoStore from "@/store/userInfo";

import { Key } from "ant-design-vue/lib/vc-table/interface";
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { NoAuthentication, doNotShow } from '@/config/routeExclusion';


router.beforeEach((to, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      const { $state: { token, type } } = useUserInfoStore();
      if (token) {
            // 有token,当前页为登录页就跳转
            if (to.path === '/login') {
                  next({ path: '/' });
            } else {
                  validateAuthorization(to, (to.meta.authorization as []), type!, next);
            }
      } else {
            /* has no token*/
            if (NoAuthentication.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
                  !doNotShow.some(doNotShowItem => to.path.includes(doNotShowItem)) && saveRouteHistory(to);
                  next();
            } else {
                  next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
            }
      }
});

// 判断用户是否有权限进入
const validateAuthorization = (to: RouteLocationNormalized, routeAuthorization: Array<number>, userType: string, next: NavigationGuardNext) => {
      if (routeAuthorization && !routeAuthorization.includes(Number(userType))) {
            next('/noPermission');
      } else {
            routeAuthorization && saveRouteHistory(to);
            next();
      }
}

/**
 * @description: 保存进入的路由历史记录
 * @param {RouteLocationNormalized} to
 * @return {*}
 * @author: ljf
 */
const saveRouteHistory = (to: RouteLocationNormalized) => {
      const { $state: { routeHistorys, selectdOpenKeys }, editSelectdOpenKeys } = useRouteHistoryStore();
      getPath("", "", selectdOpenKeys, editSelectdOpenKeys, false, decodeURI(to.path));

      if (!routeHistorys.find((item: { path: string; }) => decodeURI(item.path) === decodeURI(to.path))) {
            routeHistorys.push({ id: String(new Date().getTime()), name: String(to.name), path: decodeURI(to.path) })
      }
}



/**
 * @description: 选中或展开当前菜单（不知道有没有简单方法，后期再优化）
 * @param {string} path 父级路径
 * @param {string} currentPath 当前路径
 * @param {Key[]} selectdOpenKeys 缓存中的路径数据
 * @param {Function} editSelectdOpenKeys 操作缓存中数据的方法
 * @param {boolean} flag 用于判断是不是第一次
 * @param {string} toPath 全路径
 * @return {*}
 * @author: ljf
 */
const getPath = (
      path: string,
      currentPath: string,
      selectdOpenKeys: Key[],
      editSelectdOpenKeys: Function,
      flag: boolean,
      toPath: string
) => {

      if (!flag) {
            flag = true;

            // 将路径分割成数组
            const pathSplit = toPath.split('/').filter(item => item);

            // 取出最后一位 --最后一位就是不带父级路径的当前路径
            const afterPath = pathSplit[pathSplit.length - 1];

            // 通过最后一位截取出，不带当前路径的父级路径
            const beforePath = toPath.split('/' + afterPath)[0];

            const newToPathSplit = beforePath.split('/');

            const newAfterPath = "/" + newToPathSplit[newToPathSplit.length - 1];

            getPath(beforePath, newAfterPath, selectdOpenKeys, editSelectdOpenKeys, flag, toPath);
            return;
      }
      if (!path) return;

      if (!selectdOpenKeys.find(item => item === path) && flag) {
            editSelectdOpenKeys([path], 'add');
      }
      if (!currentPath) return;

      // 继续往前截取
      const pathSplit = path.split(currentPath);


      if (pathSplit.length) {
            getPath(pathSplit[0], pathSplit[1], selectdOpenKeys, editSelectdOpenKeys, flag, toPath);
      }
}