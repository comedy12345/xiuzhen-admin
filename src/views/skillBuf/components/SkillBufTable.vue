<template>
    <div class="skill-buf-table-container">
        <a-table :dataSource="tableData?.records" :columns="columns" bordered size="small"
                 :scroll="{ x: 1200, y: 400 }" :pagination="pagination" :loading="tableLoading">
            <template #customFilterDropdown="props">
                <div v-if="props.column.key === 'sid'"
                     class="skill-query-box">
                    <a-input :placeholder="props.column.title" :value="props.selectedKeys[0]"
                             @change="(e: ChangeEvent) => props.setSelectedKeys(e.target.value ? [e.target.value] : [])">
                    </a-input>
                    <QueryFooter :filter-dropdown-props="props"
                                 @handle-reset="(e) => handleReset(e)"
                                 @handle-search="(e) => handleSearch(e)">
                    </QueryFooter>
                </div>
                <div v-else-if="isShowFilter(props.column.key)"
                     class="skill-query-box">
                    <a-select :value="props.selectedKeys[0]"
                              :options="getEnumByKey(props.column.key)"
                              :placeholder="props.column.title"
                              show-search
                              :filter-option="filterOption"
                              @change="(value: SelectValue) => props.setSelectedKeys(value || value === 0 ? [value] : [])"
                              style="width: 120px;" />
                    <QueryFooter :filter-dropdown-props="props"
                                 @handle-reset="(e) => handleReset(e)"
                                 @handle-search="(e) => handleSearch(e)">
                    </QueryFooter>
                </div>
            </template>
            <template #bodyCell="{ column, record }">

                <template v-if="column.key === 'action'">
                    <a-button type="text" style="color: #1890FF;"
                              @click="handlerAddSkillBuf(record)">编辑
                    </a-button>
                    <a-button type="text" style="color: red;">删除</a-button>
                </template>
            </template>
        </a-table>
        <EditSkillBuf v-if="showEditSkillBuf" :formDataProp="currentSkillBuf" title="修改buf"
                      @close-edit="showEditSkillBuf = false"
                      @on-ok="handlerOk">
        </EditSkillBuf>
    </div>
</template>
    
<script setup lang='ts'>
import { queryBufTypeEnums, querySkillBufs } from '@/api/skillBufApi';
import { ISelectDatas, ISelectOptionVoList, ISkillBufForm, ISkillBufList } from '@/interface/skillBufType';
import { IBaseQueryParameter, IData } from '@/interface/types';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { columns } from '@/config/skillBufConfig';
import EditSkillBuf from './EditSkillBuf.vue';
import useGeneralQuery from "@/hooks/generalQuery";
import QueryFooter from '@/components/QueryFooter/index.vue'
import { SelectValue } from 'ant-design-vue/es/select';
import { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface';
const route = useRoute();
const showEditSkillBuf = ref(false);
const currentSkillBuf = ref<ISkillBufForm>()
const handlerAddSkillBuf = (record: ISkillBufForm) => {
    currentSkillBuf.value = record;
    showEditSkillBuf.value = true;
}
const tableData = ref<IData<ISkillBufList[]>>();
const tableLoading = ref(false);
// 分页对象
const pagination = computed(() => ({
    total: tableData.value?.total,
    current: tableData.value?.current,
    pageSize: tableData.value?.size,
}));
// 查询参数
const queryParameter = reactive<IBaseQueryParameter>({
    size: 10,
    current: 1,
    columns: [{ func: 'eq', name: 'skillSid', value: route.params.skillSid }]
});

const bufSelects = ref<ISelectDatas[]>([]);
const getBufSelects = async () => {
    const { data } = await queryBufTypeEnums();
    bufSelects.value = data;
}
// 通过类型查出对应枚举
const getEnumByType = (type: number) => {
    return bufSelects.value.find(item => item.type === type)?.selectOptionVoList.map(item => {
        item.label = item.name;
        item.value = item.val;
        return item;
    });
}
const obj = {
    bufTypeStr: 1, changeValTypeStr: 2, cycleTypeStr: 3,
    findDomainStr: 4, findPropStr: 5, refTargetStr: 6, resultTypeStr: 7, changeTypeStr: 8
};
const getEnumByKey = (key: string) => {
    return getEnumByType(obj[key]);
}
const filterOption = (input: string, option: ISelectOptionVoList) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
// 获取buf列表数据
const getSkillBufs = async () => {
    const { data } = await querySkillBufs(queryParameter, tableLoading);
    tableData.value = data;
}
const isShowFilter = (key: number) => {
    return !!obj[key];
}

// 使用通用查询
const { handleSearch, handleReset } = useGeneralQuery(queryParameter, getSkillBufs);

const handlerOk = () => {
    showEditSkillBuf.value = false;
    getSkillBufs();
}
onMounted(() => {
    getSkillBufs();
    getBufSelects();
});
defineExpose({
    getSkillBufs
})

</script>
    
<style lang="scss" scoped>
.skill-buf-table-container {
    padding: 20px;
    background-color: white;
    border-radius: 8px;
}

.ant-table-filter-dropdown {
    .skill-query-box {
        display: flex;
        flex-direction: column;
        padding: 10px;
        justify-content: space-between;
        height: 80px;
        align-items: center;
    }
}
</style>