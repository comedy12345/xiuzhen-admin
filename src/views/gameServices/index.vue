<template>
    <div class="game-services-container">
        <HeadActions @refresh-table="getList" :parameterColumn="queryParameter.columns"></HeadActions>
        <div class="table-box">
            <a-table :dataSource="tableData?.records" :columns="columns" bordered :pagination="pagination" size="small"
                     :loading="loading" @change="handleTableChange" :sticky="{ offsetHeader: -21 }"
                     :scroll="{ x: true }">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'action'">
                        <div class="action">
                            <a-button type="text" style="color: #1890FF;" @click="editHandle(record)">编辑</a-button>
                            <a-popconfirm placement="leftTop" title="确定要删除这个游戏服务/区服?" ok-text="删除" cancel-text="取消"
                                          @confirm="runRequst(deleteHandle, null, record.tid)">
                                <a-button type="text" style="color: red;">删除</a-button>
                            </a-popconfirm>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'stat'">
                        {{ status[record.stat] && status[record.stat].text }}
                    </template>
                </template>
            </a-table>
        </div>

        <edit-game-services ref='editGameServicesRef' :editGameService="editGameService" type="update"
                            @refresh-table="getList">
        </edit-game-services>
    </div>

</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, Ref, ref } from "vue";
import HeadActions from "./componets/HeadActions.vue";
import { columns, status } from '../../config/gameServicesConfig';
import { queryGameServices, deleteGameServices } from '@/api/gameServices/gameServicesApi'
import { IGameServicesForm, IGameServicesList } from "@/interface/gameServicesTypes";
import { IColumns, IData } from "@/interface/types";
import { TablePaginationConfig, message } from "ant-design-vue";
import EditGameServices from './componets/EditGameServices.vue';
import { runRequst } from '@/utils/ExceptionCapture';
import { IBaseQueryParameter } from '@/interface/types';
// 表格加载状态
let loading = ref(false);

// 编辑框Ref
const editGameServicesRef = ref<any>(null);

// 查询参数
const queryParameter = reactive<IBaseQueryParameter>({
    size: 10,
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
    getList();
}

// 查询
const getList = async (queryColumn?: IColumns[]) => {
    queryParameter.columns = queryColumn || [];
    const { data } = await queryGameServices(queryParameter, loading);
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

onMounted(() => {
    getList();
})

</script>

<style lang="scss" scoped>
.game-services-container {
    min-width: 1240px;
    margin: 0 auto;

    .action {
        display: flex;
        justify-content: space-around;
    }

    .table-box {
        padding: 20px;
        background-color: white;
        border-radius: 8px;
    }
}
</style>