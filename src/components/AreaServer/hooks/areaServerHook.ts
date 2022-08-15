import { queryGameServices } from '@/api/gameServicesApi'
import { IBaseQueryParameter } from '@/interface/types';
import { CascaderProps, SelectProps } from 'ant-design-vue';
import { CascaderOptionType } from 'ant-design-vue/es/cascader';
import { computed, onMounted, ref, } from 'vue';
export default function () {
    const queryData: IBaseQueryParameter = {
        current: 1,
        size: 999,

    };
    const options = ref<CascaderProps['options']>([]);

    // const loadData: CascaderProps['loadData'] = async selectedOptions => {
    //     const targetOption = selectedOptions[selectedOptions.length - 1];;
    //     queryData.columns = [{ func: 'eq', name: 'parentTid', value: targetOption.value }];
    //     try {
    //         const { data: { records } } = await queryGameServices(queryData);
    //         targetOption.children = records.map(item => {
    //             const childOptions: CascaderOptionType = { label: item.serverName, value: item.tid };
    //             return childOptions;
    //         });
    //         options.value = [...options.value!];
    //     } catch (error) {
    //         targetOption.children = [];
    //     }
    // };



    // 获取服务器数据
    // const getOptions = async () => {
    //     const { data: { records } } = await queryGameServices(queryData);
    //     const initOptions: CascaderProps['options'] = [];
    //     records.forEach(item => {
    //         initOptions.push({ label: item.serverName, value: item.tid, isLeaf: false })
    //     });
    //     options.value = initOptions;
    // }

    const getOptions = async () => {
        const { data: { records } } = await queryGameServices(queryData);
        const initOptions: SelectProps['options'] = [];
        records.forEach(item => {
            initOptions.push({ label: item.serverName, value: item.tid })
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