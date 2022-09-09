<template>
    <div class="skill-table-container" ref="tableRef">
        <a-table :dataSource="tableData?.records"
                 rowKey="tid"
                 :loading="tableLoading"
                 :columns="filterColumns"
                 :indentSize="40" size="small" bordered
                 :pagination="isOpenPagination ? pagination : false"
                 :row-selection="isOpenMultiple ? rowSelection : undefined"
                 :sticky="{ offsetHeader: 0 }"
                 :scroll="{ x: 1200 }"
                 @change="handleTableChange">
            <template #customFilterDropdown="props">
                <div v-if="props.column.key === 'skillName' || props.column.key === 'sid'"
                     class="skill-query-box">
                    <a-input :placeholder="props.column.title" :value="props.selectedKeys[0]"
                             @change="(e: ChangeEvent) => props.setSelectedKeys(e.target.value ? [e.target.value] : [])">
                    </a-input>
                    <QueryFooter :filter-dropdown-props="props"
                                 @handle-reset="(e) => handleReset(e)"
                                 @handle-search="(e) => handleSearch(e)">
                    </QueryFooter>
                </div>
                <div v-else-if="props.column.key === 'passivityStr' || props.column.key === 'isCombineStr'"
                     class="skill-query-box">
                    <a-select
                              style="width: 120px;"
                              :value="props.selectedKeys[0]"
                              :options="[{ value: 0, label: '否' }, { value: 1, label: '是' }]"
                              placeholder="请选择"
                              @change="(val: SelectValue) => props.setSelectedKeys(val || val === 0 ? [val] : [])">

                    </a-select>
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
                        <a-button v-if="!isCacheDel" type="text" style="color: #1890FF;"
                                  @click="router.push(`/skillBuf/${record.sid}/${record.skillName}技能buf管理`)">
                            技能buf
                        </a-button>

                        <a-button v-if="record.isCombine === 1 && !isCacheDel" type="text"
                                  style="color: #1890FF;"
                                  @click="handlerChildSkill(record.tid)">
                            子技能
                        </a-button>
                        <a-button v-if="!isCacheDel" type="text" style="color: #1890FF;"
                                  @click="handlerEdit(record)">
                            编辑
                        </a-button>

                        <a-popconfirm placement="leftTop" title="确定要删除这个技能?" ok-text="删除"
                                      cancel-text="取消" @confirm="deleteHandle(record)">
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
import { computed, nextTick, onMounted, reactive, ref, toRefs, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import EditSkill from '@/views/skill/components/EditSkill.vue';
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
import { SelectValue } from 'ant-design-vue/es/select';
import { ColumnsType } from 'ant-design-vue/es/table';

const props = defineProps({
    // 是否删除表格操作列-默认不删除
    isDelAction: {
        type: Boolean,
        default: false
    },
    // 是否是缓存内删除-默认不是
    isCacheDel: {
        type: Boolean,
        default: false
    },
    // 是否只查询非组合技能-默认不是
    isCombine: {
        type: Boolean,
        default: false
    },
    // 是否隐藏表格自定义筛选项-默认不是
    isHideScreen: {
        type: Boolean,
        default: false
    },
    // 是否开启拖拽排序-默认不开启
    isDragSort: {
        type: Boolean,
        default: false
    },
    // 是否开启多选-默认不开启
    isOpenMultiple: {
        type: Boolean,
        default: false
    },
    // 是否开启分页-默认开启
    isOpenPagination: {
        type: Boolean,
        default: true
    },
    // 是否关联技能模式-默认不开启
    isRelationSkill: {
        type: Boolean,
        default: false
    },
    // 是否单点操作，点一次请求一次
    isSinglePoint: {
        type: Boolean,
        default: false
    },
    dataSource: {
        type: Object as () => ISkillList[],
        default: []
    },
    selectedRowKeys: {
        type: Array<Key>,
        default: []
    },
    detail: {
        type: Boolean,
        default: true
    }
})
const {
    isDelAction,
    dataSource,
    isCacheDel,
    selectedRowKeys,
    isCombine,
    isHideScreen,
    isDragSort,
    isOpenMultiple,
    isOpenPagination,
    isRelationSkill, isSinglePoint, detail } = toRefs(props);
const emit = defineEmits(['child-Skill', 'get-Select-skill', 'del-skill', 'get-Select-all-skill', 'del-skill-single']);
const router = useRouter();


// 编辑弹出层开启
const showEditSkill = ref(false);
const editTid = ref('');
const handlerEdit = (record: ISkillForm) => {
    showEditSkill.value = true;
    editTid.value = record.tid!;
}

// 删除
const deleteHandle = async (record: any) => {
    if (isSinglePoint.value) {
        emit('del-skill-single', record.partnerSkillTid);
        return;
    }
    if (isCacheDel.value) {
        emit('del-skill', tableData.value.records.filter(item => item.tid !== record.tid));
        return;
    }
    const { data } = await deleteSkill(record.tid);
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
    showTotal: (total: number) => '总数 ' + total + ' 条'
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
    let newColumns: ColumnsType<any> = columns;
    // 隐藏表格筛选
    if (isHideScreen.value) {
        newColumns = columns.map(item => {
            item.width = 80;
            item.customFilterDropdown = false;
            return item;
        })
    }
    // 删除表格操作列
    if (isDelAction.value || !detail.value) {
        newColumns = columns.filter(item => {
            return item.key !== 'action';
        })
    }
    return newColumns;
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
    if (isRelationSkill.value) {
        // 技能排序
        watchEffect(() => {
            tableData.value.records = dataSource.value;
            if (isDragSort.value && !isSinglePoint.value) {
                nextTick(() => { initSortable() });
            }
        })
        return;
    }

    // 是否子查询非组合技能
    isCombine.value && queryParameter.columns?.push({ func: "eq", name: 'isCombine', value: 0 });
    getSkills();
    nextTick(() => {
        watchEffect(() => {
            rowSelection.value!.selectedRowKeys = selectedRowKeys.value;
        })
    })
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

