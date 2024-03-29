
import { queryEnums } from "@/api/enumApi";
import { ISelectDatas, ISelectOptionVoList } from "@/interface/types";
import { onMounted, ref } from "vue";

/*
 * @Description: 获取后端枚举
 * @Author: ljf
 * @Date: 2022-08-17 11:33:28
 * @LastEditors: ljf
 * @LastEditTime: 2022-08-18 08:43:51
 */
export default function () {
    const obj = {
        bufTypeStr: 1, changeValTypeStr: 2, cycleTypeStr: 3,
        findDomainStr: 4, findPropStr: 5, refTargetStr: 6, resultTypeStr: 7, changeTypeStr: 8, orderIdxStr: 9, raceStr: 13, jobStr: 14
    };
    const bufSelects = ref<ISelectDatas[]>([]);

    const getSelects = async () => {
        const { data } = await queryEnums();
        bufSelects.value = data;
    }

    // 通过字段获取枚举
    const getEnumByKey = (key: string) => {
        return getEnumByType(obj[key]);
    }
    // 是否有这个枚举
    const isShowFilter = (key: number) => {
        return !!obj[key];
    }
    // 通过类型查出对应枚举
    const getEnumByType = (type: number) => {
        return bufSelects.value.find(item => item.type === type)?.selectOptionVoList.map(item => {
            item.label = item.name;
            item.value = item.val;
            return item;
        });
    }
    // 下拉框过滤
    const filterOption = (input: string, option: ISelectOptionVoList) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    onMounted(() => {
        getSelects();
    })

    return {
        bufSelects,
        getEnumByKey,
        getEnumByType,
        isShowFilter,
        filterOption
    }

}