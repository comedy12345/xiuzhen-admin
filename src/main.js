/*
 * @Description: 入口文件
 * @Author: ljf
 * @Date: 2022-07-13 17:07:44
 * @LastEditors: ljf
 * @LastEditTime: 2022-08-18 09:12:51
 */
import 'ant-design-vue/dist/antd.css';
import { createApp } from 'vue';
// import Antd from 'ant-design-vue';
import App from './App.vue';
import pinia from "./store/store";
import { router } from '@/route/index';
// 引入注册svg脚本
import svgIcon from "@/components/SvgIcon/index.vue";
import 'virtual:svg-icons-register';
import '@/interceptor';

const app = createApp(App);
app.use(pinia);
app.use(router);
// app.use(Antd);
app.component('svg-icon', svgIcon);
app.mount('#app');
