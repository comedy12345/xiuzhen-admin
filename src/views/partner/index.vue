<!--
 * @Description: 伙伴信息管理
 * @Author: ljf
 * @Date: 2022-08-11 09:16:46
 * @LastEditors: ljf
 * @LastEditTime: 2022-08-23 15:07:47
-->
<template>
    <div class="partner-container">
        <HeaderOperation @add="handlerAdd"></HeaderOperation>
        <div class="table-box">
            <a-table :loading="tableLoading" :dataSource="tableData?.records" rowKey="tid" :columns="columns"
                     size="small" bordered :pagination="pagination" :scroll="{ x: 1200, y: 400 }" @change="handleTableChange">
                <template #customFilterDropdown="props">
                    <div v-if="['sid', 'partnerName'].some(key => key === props.column.key)" class="skill-query-box">
                        <a-input :placeholder="props.column.title"
                                 :value="props.selectedKeys[0]"
                                 @change="(e: ChangeEvent) => props.setSelectedKeys(e.target.value ? [e.target.value] : [])">
                        </a-input>
                        <QueryFooter :filter-dropdown-props="props"
                                     @handle-reset="(e) => handleReset(e)"
                                     @handle-search="(e) => handleSearch(e)">
                        </QueryFooter>
                    </div>
                    <div v-else-if="props.column.key === 'domainTid'" class="skill-query-box">
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
                        <a-button type="text" style="color: #1890FF;" @click="handlerEdit(record)">编辑</a-button>
                        <a-popconfirm placement="leftTop" title="确定要删除这个伙伴?" ok-text="删除"
                                      cancel-text="取消" @confirm="handlerDelete(record.tid!)">
                            <a-button type='text' style='color: red;'>
                                删除
                            </a-button>
                        </a-popconfirm>
                    </template>
                </template>
            </a-table>
        </div>
        <EditPartner ref="editRef" :editFormData="currentEditData" @ok="handlerOk" @cancel="handlerCancel"></EditPartner>
    </div>
</template>
    
<script setup lang='ts'>
import HeaderOperation from './components/HeaderOperation.vue';
import EditPartner from './components/EditPartner.vue';
import { columns } from '@/config/partnerConfig';
import { deletePartner, queryPartners } from '@/api/partnerApi';
import { IPartnerForm, IPartnerList } from '@/interface/partnerType';
import { message } from 'ant-design-vue';
import useCommons from "@/hooks/commons";
import useGeneralQuery from "@/hooks/generalQuery";
import { ChangeEvent } from 'ant-design-vue/lib/_util/EventInterface';
import AreaServer from "@/components/AreaServer/index.vue";

const getPartnerList = async () => {
    const { data } = await queryPartners(queryParameter, tableLoading);
    tableData.value = data;
}

const {
    queryParameter,
    pagination,
    tableData,
    tableLoading,
    editRef,
    currentEditData,
    handlerAdd,
    handlerEdit,
    handleTableChange,
    handlerOk,
    handlerCancel
} = useCommons<IPartnerList, IPartnerForm>(getPartnerList);

// 使用通用查询
const { handleSearch, handleReset } = useGeneralQuery(queryParameter, getPartnerList);

const handlerDelete = async (tid: string) => {
    const { data } = await deletePartner(tid);
    message.success(data);
    getPartnerList();
}
</script>
    
<style lang="scss" scoped>
.partner-container {
    .table-box {
        padding: 20px;
        background-color: white;
        border-radius: 8px;
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