import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";

export const routes: RouteRecordRaw[] = [
      {
            path: '',
            component: () => import('@/views/layout/index.vue'),
            redirect: '/login',
            children: [
                  {
                        name: '首页',
                        path: '/dashboard',
                        component: () => import('@/views/home/index.vue')
                  },
                  {
                        name: '技能组合管理',
                        path: '/skillSet',
                        component: () => import('@/views/skillSet/index.vue'),

                  },

                  {
                        name: '技能buf管理',
                        path: '/skillBuf',
                        component: () => import('@/views/skillBuf/index.vue'),

                  },
                  {
                        name: '人物属性管理',
                        path: '/characterAttribute',
                        component: () => import('@/views/characterAttribute/index.vue'),
                  },


            ]
      },
      {
            path: '/login',
            component: () => import('@/views/login/index.vue')
      }

];
export const router = createRouter({
      history: createWebHashHistory(),
      routes,
})