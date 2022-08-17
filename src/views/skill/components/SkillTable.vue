<template>
    <div class="skill-table-container" ref="tableRef">
        <a-table :dataSource="tableData?.records"
                 rowKey="tid"
                 :loading="tableLoading"
                 :columns="filterColumns"
                 :indentSize="40" size="small" bordered
                 :pagination="!isSort ? pagination : false"
                 :row-selection="isChild && !isSort ? rowSelection : undefined"
                 :sticky="{ offsetHeader: !isSort ? -21 : 0 }"
                 :scroll="{ x: 1200 }"
                 @change="handleTableChange">
            <template #customFilterDropdown="props">
                <div v-if="props.column.key === 'skillName'" class="skill-query-box">
                    <a-input placeholder="技能名称" :value="props.selectedKeys[0]"
                             @change="(e: ChangeEvent) => props.setSelectedKeys(e.target.value ? [e.target.value] : [])">
                    </a-input>
                    <QueryFooter :filter-dropdown-props="props"
                                 @handle-reset="(e) => handleReset(e)"
                                 @handle-search="(e) => handleSearch(e)">
                    </QueryFooter>
                </div>
                <div v-else-if="props.column.key === 'passivityStr' || props.column.key === 'isCombineStr'"
                     class="skill-query-box">

                    <a-radio-group :value="props.selectedKeys[0]"
                                   @change="(e: RadioChangeEvent) => props.setSelectedKeys(e.target.value || e.target.value === 0 ? [e.target.value] : [])"
                                   button-style="solid">
                        <a-space :size="20">
                            <a-radio-button :value="1">是</a-radio-button>
                            <a-radio-button :value="0">否</a-radio-button>
                        </a-space>
                    </a-radio-group>


                    <QueryFooter :filter-dropdown-props="props"
                                 @handle-reset="(e) => handleReset(e)"
                                 @handle-search="(e) => handleSearch(e)">
                    </QueryFooter>
                </div>
                <div v-else-if="props.column.key === 'domainId'"
                     class="skill-query-box">
                    <AreaServer :value="props.selectedKeys[0]"
                                @update:value="value => props.setSelectedKeys(value ? [value] : [])">
                    </AreaServer>
                    <QueryFooter :filter-dropdown-props="props"
                                 @handle-reset="(e) => handleReset(e)"
                                 @handle-search="(e) => handleSearch(e)">
                    </QueryFooter>
                </div>

            </template>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <div class="action">
                        <a-button v-if="!isSort" type="text" style="color: #1890FF;"
                                  @click="router.push(`/skillBuf/${record.sid}/${record.skillName}技能buf管理`)">
                            技能buf
                        </a-button>

                        <a-button v-if="record.isCombine === 1 && !isSort" type="text"
                                  style="color: #1890FF;"
                                  @click="handlerChildSkill(record.tid)">
                            子技能
                        </a-button>
                        <a-button v-if="!isSort" type="text" style="color: #1890FF;"
                                  @click="handlerEdit(record)">
                            编辑
                        </a-button>

                        <a-popconfirm placement="leftTop" title="确定要删除这个技能?" ok-text="删除"
                                      cancel-text="取消" @confirm="deleteHandle(record.tid!)">
                            <a-button type='text' style='color: red;'>
                                删除
                            </a-button>
                        </a-popconfirm>
                    </div>

                </template>
            </template>
        </a-table>
        <EditSkill v-if="showEditSkill" @close-edit-skill="showEditSkill = false"
                   :tid="editTid" @on-ok="getSkills">
        </EditSkill>
    </div>
</template>
    
<script setup lang='ts'>
import { ISkillForm, ISkillList } from '@/interface/skillTypes';
import { computed, nextTick, onMounted, reactive, ref, toRefs, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import EditSkill from '../components/EditSkill.vue';
import { deleteSkill, querySkills } from '@/api/skillApi';
import { message, RadioChangeEvent, TablePaginationConfig, TableProps } from 'ant-design-vue';
import { IBaseQueryParameter, IData } from '@/interface/types';
import { getColumns } from '@/config/skillConfig';
import { Key } from 'ant-design-vue/lib/table/interface';
import QueryFooter from '@/components/QueryFooter/index.vue';
import useGeneralQuery from "@/hooks/generalQuery";
import AreaServer from '@/components/AreaServer/index.vue';
import { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface';
import Sortable from "sortablejs";

const props = defineProps({
    isChild: {
        type: Boolean,
        defalut: false
    },
    dataSource: {
        type: Object as () => ISkillList[],
        default: []
    },
    isSort: {
        type: Boolean,
        default: false
    },
    selectedRowKeys: {
        type: Array<Key>,
        default: []
    }
})
const { isChild, dataSource, isSort, selectedRowKeys } = toRefs(props);
const emit = defineEmits(['child-Skill', 'get-Select-skill', 'del-skill', 'get-Select-all-skill']);
const router = useRouter();


// 编辑弹出层开启
const showEditSkill = ref(false);
const editTid = ref('');
const handlerEdit = (record: ISkillForm) => {
    showEditSkill.value = true;
    editTid.value = record.tid!;
}

// 删除
const deleteHandle = async (tid: string) => {
    if (isChild.value) {
        emit('del-skill', tableData.value.records.filter(item => item.tid !== tid));
        return;
    }
    const { data } = await deleteSkill(tid);
    message.success(data);
    getSkills();
}

// 列表查询相关>>>>>>>>>>>>>>>>
const columns = getColumns();
const queryParameter = reactive<IBaseQueryParameter>({
    size: 10,
    current: 1,
    columns: []
});
const { handleSearch, handleReset } = useGeneralQuery(queryParameter);

const tableData = ref<IData<ISkillList[]>>({
    records: []
});

const pagination = computed(() => ({
    total: tableData.value?.total,
    current: tableData.value?.current,
    pageSize: tableData.value?.size,
}));

const tableLoading = ref(false);
const getSkills = async () => {
    const { data } = await querySkills(queryParameter, tableLoading);
    tableData.value = data;
}

const handleTableChange = (pagination: TablePaginationConfig) => {
    queryParameter.current = pagination.current!;
    queryParameter.size = pagination.pageSize;
    getSkills();
}
// 列表查询结束<<<<<<<<<<<<<<<<<<<<<<



// 选中数据事件
const rowSelection = ref<TableProps['rowSelection']>({
    selectedRowKeys: selectedRowKeys.value,
    onSelect: (record, selected): void => {
        emit('get-Select-skill', record, selected);
    },
    onSelectAll: (selected, _, changeRows): void => {
        emit('get-Select-all-skill', selected, changeRows);
    }
});

// 字段过滤
const filterColumns = computed(() => {
    if (isSort.value) {
        return columns.filter(item => {
            return item.key !== 'isCombine' && item.key !== 'combineSkOrder';
        }).map(item => {
            if (item.key === 'action') {
                item.width = 100;
            }
            item.customFilterDropdown = false;
            return item;
        })
    } else if (isChild.value) {
        return columns.filter(item => {
            return item.key !== 'isCombine' && item.key !== 'combineSkOrder' && item.key !== 'action';
        })
    } else {
        return columns;
    }
})

const tableRef = ref<HTMLElement>();

// 初始化拖拽排序
const initSortable = () => {
    new Sortable(tableRef.value?.querySelector('.ant-table-tbody'), {
        onEnd: function ({ oldIndex, newIndex }: any) {
            const copyDataSource = tableData.value.records;
            const oldData = copyDataSource[oldIndex - 1];
            copyDataSource.splice(oldIndex - 1, 1);
            copyDataSource.splice(newIndex - 1, 0, oldData);
        },
    })
}

onMounted(() => {
    // 技能排序
    if (isSort.value) {
        watchEffect(() => {
            tableData.value.records = dataSource.value;
            nextTick(() => {
                initSortable();
            })
        })
        return;
    }
    // 选择技能
    if (isChild.value) {
        queryParameter.columns?.push({ func: "eq", name: 'isCombine', value: 0 });
        nextTick(() => {
            watchEffect(() => {
                rowSelection.value!.selectedRowKeys = selectedRowKeys.value;
            })
        })
    }
    getSkills();
});


// 监听点击子技能管理
const handlerChildSkill = (tid: string) => {
    emit("child-Skill", tid);
}

defineExpose({
    getSkills
})


</script>
    
<style lang="scss" scoped>
.skill-table-container {
    padding: 20px;
    background-color: white;
    border-radius: 8px;


    :deep(.ant-table-wrapper) {
        .action {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            .ant-btn {
                padding: 5px;
            }
        }
    }

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

