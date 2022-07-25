<template>
    <div class="game-services-container">
        <HeadActions @success="seaech" :parameterColumn="queryParameter.columns"></HeadActions>
        <a-table :dataSource="tableData?.records" :columns="columns" bordered :pagination="pagination" size="small"
            :loading="loading" @change="handleTableChange">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <div class="action">
                        <a-button type="text" @click="editHandle(record)">
                            <template #icon>
                                <edit-outlined style="color: #1890FF" />
                            </template>
                        </a-button>
                        <a-popconfirm placement="leftTop" title="确定要删除这个游戏服务/区服?" ok-text="删除" cancel-text="取消"
                            @confirm="runRequst(deleteHandle, null, record.tid)">
                            <template #icon>
                                <question-circle-outlined style="color: red" />
                            </template>
                            <a-button type="text" danger>
                                <template #icon>
                                    <delete-outlined />
                                </template>
                            </a-button>
                        </a-popconfirm>
                    </div>
                </template>
                <template v-else-if="column.key === 'stat'">
                    {{ status[record.stat].text }}
                </template>
            </template>
        </a-table>
        <edit-game-services ref='editGameServicesRef' :editGameService="editGameService" type="update"
            @success="seaech()">
        </edit-game-services>
    </div>

</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, Ref, ref } from "vue";
import HeadActions from "./componets/HeadActions.vue";
import { columns, status } from './config';
import { queryGameServices, deleteGameServices } from '@/api/gameServices/gameServicesApi'
import { IGameServicesForm, IGameServicesList } from "@/api/gameServices/gameServicesTypes";
import { IColumns, IData } from "@/api/types";
import { TablePaginationConfig, message } from "ant-design-vue";
import EditGameServices from './componets/EditGameServices.vue';
import { runRequst } from '@/utils/ExceptionCapture';
import { IBaseQueryParameter } from '@/api/types'
console.log(import.meta.env.VITE_BASE_URL);
// 表格加载状态
let loading = ref(false);

// 编辑框Ref
const editGameServicesRef = ref<any>(null);

// 查询参数
const queryParameter = reactive<IBaseQueryParameter>({
    size: 5,
    current: 1
})

// 表格数据
const tableData = ref<IData<IGameServicesList[]>>();

// 当前编辑数据
const editGameService = ref<IGameServicesForm>();

// 分页参数
const pagination = computed(() => ({
    total: tableData.value?.total,
    current: tableData.value?.current,
    pageSize: tableData.value?.size,
}));

// 分页事件
const handleTableChange = (pagination: TablePaginationConfig) => {
    queryParameter.current = pagination.current!;
    seaech();
}

// 查询
const getList = async () => {
    if (!queryParameter.columns?.length) {
        queryParameter.columns = [];
    }

    loading.value = true;
    const { data } = await queryGameServices(queryParameter);
    tableData.value = data;
}

// 编辑
const editHandle = (gameService: IGameServicesList) => {
    editGameServicesRef.value.visible = true;
    editGameService.value = ({ ...gameService } as IGameServicesForm);
}

// 删除
const deleteHandle = async (tid: number) => {
    const { data } = await deleteGameServices(tid);
    message.success(data);
    getList();
}
const seaech = (queryColumn?: IColumns[]) => {
    queryParameter.columns = queryColumn!;
    runRequst(getList, loading);
}

onMounted(async () => {
    seaech();
})

</script>

<style lang="scss" scoped>
.game-services-container {
    overflow: auto;
    background-color: white;
    height: 100%;
    padding: 20px;

    .action {
        display: flex;
        justify-content: space-around;
    }
}
</style>