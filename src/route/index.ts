/*
 * @Description: 路由信息
 * @Author: ljf
 * @Date: 2022-07-13 17:07:44
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-09 10:21:58
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
                        meta: { icon: 'dashboard-two-tone' },
                        component: () => import('@/views/home/index.vue'),
                  },
                  {
                        name: '游戏服务',
                        path: '/gameServices',
                        meta: { icon: 'cluster-outlined' },
                        component: () => import('@/views/gameServices/index.vue'),
                  },
                  {
                        name: '技能管理',
                        path: '/skill',
                        meta: { icon: 'bulb-outlined' },
                        component: () => import('@/views/skill/index.vue'),

                  },
                  {
                        name: '技能buf管理',
                        path: '/skillBuf/:skillSid/:tagName',
                        component: () => import('@/views/skillBuf/index.vue'),
                  },
                  {
                        name: '用户管理',
                        path: '/user',
                        meta: { icon: 'user-outlined' },
                        component: () => import('@/views/user/index.vue'),

                  },
                  {
                        name: '玩家管理',
                        path: '/gamer',
                        meta: { icon: 'user-outlined' },
                        component: () => import('@/views/gamer/index.vue'),

                  },
                  {
                        name: '伙伴管理',
                        path: '/partner',
                        meta: { icon: 'team-outlined' },
                        component: () => import('@/views/partner/index.vue'),

                  },
            ]
      },

      {
            path: '/login',
            component: () => import('@/views/login/index.vue'),
      }

];
export const router = createRouter({
      history: createWebHashHistory(),
      routes,
});