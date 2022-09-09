/*
 * @Description: 所在区hook
 * @Author: ljf
 * @Date: 2022-08-17 08:40:28
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-09 09:59:05
 */
import { queryDomain } from '@/api/gameServicesApi'
import { CascaderProps, SelectProps } from 'ant-design-vue';
import {  onMounted, ref, } from 'vue';
export default function () {

    const options = ref<CascaderProps['options']>([]);

    const getOptions = async () => {
        const { data } = await queryDomain();
        const initOptions: SelectProps['options'] = [];
        data.forEach(item => {
            initOptions.push({ label: item.serverName+'-'+item.domainName, value: item.tid })
        });
        options.value = initOptions;
    }

    onMounted(() => {
        getOptions();
    })
    return {
        options,
    }
}