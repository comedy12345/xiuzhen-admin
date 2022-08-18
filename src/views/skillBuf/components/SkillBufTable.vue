<template>
    <div class="skill-buf-table-container">

        <a-table bordered
                 size="small"
                 :dataSource="tableData?.records"
                 :columns="columns"
                 :scroll="{ x: 1200, y: 400 }"
                 :pagination="pagination"
                 :loading="tableLoading">
            <template #customFilterDropdown="props">
                <div v-if="props.column.key === 'sid'" class="skill-query-box">
                    <a-input :placeholder="props.column.title"
                             :value="props.selectedKeys[0]"
                             @change="(e: ChangeEvent) => props.setSelectedKeys(e.target.value ? [e.target.value] : [])">
                    </a-input>
                    <QueryFooter :filter-dropdown-props="props"
                                 @handle-reset="(e) => handleReset(e)"
                                 @handle-search="(e) => handleSearch(e)">
                    </QueryFooter>
                </div>
                <div v-else-if="isShowFilter(props.column.key)" class="skill-query-box">
                    <a-select style="width: 120px;"
                              show-search
                              :value="props.selectedKeys[0]"
                              :options="getEnumByKey(props.column.key)"
                              :placeholder="props.column.title"
                              :filter-option="filterOption"
                              @change="(value: SelectValue) => props.setSelectedKeys(value || value === 0 ? [value] : [])" />
                    <QueryFooter :filter-dropdown-props="props"
                                 @handle-reset="(e) => handleReset(e)"
                                 @handle-search="(e) => handleSearch(e)">
                    </QueryFooter>
                </div>
            </template>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-button type="text" style="color: #1890FF;" @click="handlerAddSkillBuf(record)">
                        编辑
                    </a-button>
                    <a-button type="text" style="color: red;">删除</a-button>
                </template>
                <template v-else-if="column.key === 'skillSid'">
                    {{ decodeURI(route.path).split('/').at(-1)?.split('技能buf管理')[0] }}
                </template>
            </template>
        </a-table>
        <EditSkillBuf v-if="showEditSkillBuf"
                      title="修改buf"
                      :formDataProp="currentSkillBuf"
                      @close-edit="showEditSkillBuf = false"
                      @on-ok="handlerOk">
        </EditSkillBuf>
    </div>
</template>
    
<script setup lang='ts'>
import { querySkillBufs } from '@/api/skillBufApi';
import { ISkillBufForm, ISkillBufList } from '@/interface/skillBufType';
import { IBaseQueryParameter, IData } from '@/interface/types';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { columns } from '@/config/skillBufConfig';
import EditSkillBuf from './EditSkillBuf.vue';
import useGeneralQuery from "@/hooks/generalQuery";
import QueryFooter from '@/components/QueryFooter/index.vue'
import { SelectValue } from 'ant-design-vue/es/select';
import { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface';
import useSkillBuf from "../hooks/skillBuf";

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
    showTotal: (total: number) => '总数 ' + total + ' 条'
}));

// 查询参数
const queryParameter = reactive<IBaseQueryParameter>({
    size: 10,
    current: 1,
    columns: [{ func: 'eq', name: 'skillSid', value: route.params.skillSid }]
});

// 获取buf列表数据
const getSkillBufs = async () => {
    const { data } = await querySkillBufs(queryParameter, tableLoading);
    tableData.value = data;
}

// 使用buf枚举下拉框
const { isShowFilter, getEnumByKey, filterOption } = useSkillBuf();

// 使用通用查询
const { handleSearch, handleReset } = useGeneralQuery(queryParameter, getSkillBufs);

const handlerOk = () => {
    showEditSkillBuf.value = false;
    getSkillBufs();
}

onMounted(() => {
    getSkillBufs();
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