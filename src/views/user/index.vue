<!--
 * @Description: 用户管理
 * @Author: ljf
 * @Date: 2022-08-11 09:16:46
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-14 14:30:42
-->
<template>
    <div class="user-container">
        <HeaderOperation @add="handlerAdd"></HeaderOperation>
        <div class="table-box">
            <a-table :dataSource="tableData?.records" rowKey="tid" :columns="columns()"
                     size="small" bordered :pagination="pagination" :loading="tableLodaing">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'action'">
                        <a-button type="text" style="color: #1890FF;" @click="handlerEdit(record)">
                            编辑
                        </a-button>
                        <RestPwd :tid="record.tid"></RestPwd>
                        <a-switch v-model:checked="record['state']" checked-children="正常" un-checked-children="冻结"
                                  :unCheckedValue="1" :checkedValue="0"
                                  @change="(checked)=>handlerState(checked,record.tid)" />
                    </template>
                </template>
                <template #customFilterDropdown="props">
                    <div v-if="['userName', 'phone'].some(key => key === props.column.key)"
                         class="skill-query-box">
                        <a-input :placeholder="props.column.title"
                                 :value="props.selectedKeys[0]"
                                 @change="(e: ChangeEvent) => props.setSelectedKeys(e.target.value ? [e.target.value] : [])">
                        </a-input>
                        <QueryFooter :filter-dropdown-props="props"
                                     @handle-reset="(e) => handleReset(e)"
                                     @handle-search="(e) => handleSearch(e)">
                        </QueryFooter>
                    </div>
                    <div v-else-if="['state'].some(key => key === props.column.key)"
                         class="skill-query-box">
                        <a-radio-group :value="props.selectedKeys[0]"
                                       @change="(e: RadioChangeEvent) => props.setSelectedKeys(e.target.value||e.target.value===0 ? [e.target.value] : [])">
                            <a-radio :value="0">正常</a-radio>
                            <a-radio :value="1">冻结</a-radio>
                        </a-radio-group>
                        <QueryFooter :filter-dropdown-props="props"
                                     @handle-reset="(e) => handleReset(e)"
                                     @handle-search="(e) => handleSearch(e)">
                        </QueryFooter>
                    </div>
                    <div v-else-if="['type'].some(key => key === props.column.key)"
                         class="skill-query-box">
                        <a-radio-group :value="props.selectedKeys[0]"
                                       @change="(e: RadioChangeEvent) => props.setSelectedKeys(e.target.value||e.target.value===0 ? [e.target.value] : [])">
                            <a-radio :value="0">超级管理员</a-radio>
                            <a-radio :value="1">管理员</a-radio>
                            <a-radio :value="2">代理</a-radio>
                        </a-radio-group>
                        <QueryFooter :filter-dropdown-props="props"
                                     @handle-reset="(e) => handleReset(e)"
                                     @handle-search="(e) => handleSearch(e)">
                        </QueryFooter>
                    </div>
                </template>
            </a-table>
        </div>
        <EditUser ref="editRef" :currentEditData="currentEditData" @ok="handlerOk"
                  @cancel="handlerCancel">
        </EditUser>
    </div>
</template>
    
<script setup lang='ts'>
import HeaderOperation from './components/HeaderOperation.vue';
import EditUser from './components/EditUser.vue';
import { columns } from '@/config/userConfig';
import { ref } from 'vue';
import useCommons from '@/hooks/commons';
import { queryUserList, saveUser } from '@/api/userApi'
import { IUserForm, IUserList } from '@/interface/userType';
import { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface';
import { RadioChangeEvent } from 'ant-design-vue/es/radio/interface';
import useGeneralQuery from "@/hooks/generalQuery";
import RestPwd from "@/components/RestPwd/index.vue";
const tableLodaing = ref(false);
const getList = async () => {
    const { data } = await queryUserList(queryParameter, tableLodaing);
    tableData.value = data;
}
const {
    editRef,
    queryParameter,
    tableData,
    pagination,
    currentEditData,
    handlerAdd,
    handlerOk,
    handlerEdit,
    handlerCancel
} = useCommons<IUserList, IUserForm>(getList);
// 使用通用查询
const { handleSearch, handleReset } = useGeneralQuery(queryParameter, getList);

const handlerState = async (state: any, tid: number) => {
    const res = await saveUser({ tid, state });
    console.log(res);
}
</script>
    
<style lang="scss" scoped>
.user-container {

    min-width: 1240px;
    margin: 0 auto;

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