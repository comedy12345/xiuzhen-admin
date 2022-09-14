/*
 * @Description: 路由信息
 * @Author: ljf
 * @Date: 2022-07-13 17:07:44
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-14 14:23:02
 */
import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";

export const routes: RouteRecordRaw[] = [
      {
            name: '首页',
            path: '/',
            redirect: '/dashboard',
            component: () => import('@/views/layout/index.vue'),
            children: [
                  {
                        name: '首页',
                        path: '/dashboard',
                        meta: { icon: 'dashboard-two-tone',authorization: [0,1,2] },
                        component: () => import('@/views/home/index.vue'),
                  },
                  {
                        name: '游戏服务',
                        path: '/gameServices',
                        meta: { icon: 'cluster-outlined',authorization: [0,1]},
                        component: () => import('@/views/gameServices/index.vue'),
                  },
                  {
                        name: '技能管理',
                        path: '/skill',
                        meta: { icon: 'bulb-outlined',authorization: [0,1,2]},
                        component: () => import('@/views/skill/index.vue'),

                  },
                  {
                        name: '技能buf管理',
                        path: '/skillBuf/:skillSid/:tagName',
                        meta: { authorization: [0,1,2]},
                        component: () => import('@/views/skillBuf/index.vue'),
                  },
                  {
                        name: '用户管理',
                        path: '/user',
                        meta: { icon: 'user-outlined' ,authorization: [0,1]},
                        component: () => import('@/views/user/index.vue'),

                  },
                  {
                        name: '玩家管理',
                        path: '/gamer',
                        meta: { icon: 'user-outlined' ,authorization: [0,1,2]},
                        component: () => import('@/views/gamer/index.vue'),

                  },
                  {
                        name: '伙伴管理',
                        path: '/partner',
                        meta: { icon: 'team-outlined',authorization: [0,1,2] },
                        component: () => import('@/views/partner/index.vue'),
                  },
            ]
      },

      {
            path: '/login',
            component: () => import('@/views/login/index.vue'),
      },
      {
            path: '/noPermission',
            component: () => import('@/views/noPermission/index.vue'),
      },
      {
            path: '/:pathMatch(.*)',
            component: () => import('@/views/404/index.vue'),
      }

];
export const router = createRouter({
      history: createWebHashHistory(),
      routes,
});