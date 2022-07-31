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
                        component: () => import('@/views/gameServices/index.vue'),
                  },
                  {
                        name: '游戏服务',
                        path: '/gameServices',
                        component: () => import('@/views/gameServices/index.vue'),
                  },
                  {
                        name: '技能管理',
                        path: '/skill',
                        component: () => import('@/views/skill/index.vue'),

                  },
                  {
                        name: '技能buf管理',
                        path: '/skillBuf/:skillId',
                        component: () => import('@/views/skillBuf/index.vue'),

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