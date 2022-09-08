<template>
    <div class="user-container">
        <HeaderOperation @add="handlerAdd"></HeaderOperation>
        <div class="table-box">
            <a-table :dataSource="tableData?.records" rowKey="tid" :columns="columns"
                     size="small" bordered :pagination="pagination" :loading="tableLodaing">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'action'">
                        <a-button type="text" style="color: #1890FF;">
                            查看用户伙伴
                        </a-button>
                        <a-button type="text" style="color: #1890FF;" @click="handlerEdit(record)">
                            编辑
                        </a-button>
                        <a-button type="text" style="color: red;">删除</a-button>
                    </template>
                </template>
            </a-table>
        </div>
        <EditUser ref="editRef" :currentEditData="currentEditData" @ok="handlerOk"
                  @cancel="handlerCancel">
        </EditUser>
        <UserPartner ref="userPartnerRef"></UserPartner>
    </div>
</template>
    
<script setup lang='ts'>
import HeaderOperation from './components/HeaderOperation.vue';
import EditUser from './components/EditUser.vue';
import UserPartner from './components/UserPartner.vue'
import { columns } from '@/config/userConfig';
import { ref } from 'vue';
import useCommons from '@/hooks/commons';
import { queryUserList } from '@/api/userApi'
import { IUserForm, IUserList } from '@/interface/userType';
const tableLodaing = ref(false);
const getList = async () => {
    const { data } = await queryUserList(queryParameter, tableLodaing);
    tableData.value = data;
}
const { editRef, queryParameter, tableData, pagination, currentEditData, handlerAdd, handlerOk, handlerEdit, handlerCancel } = useCommons<IUserList, IUserForm>(getList)
</script>
    
<style lang="scss" scoped>
.user-container {
    .table-box {
        padding: 20px;
        background-color: white;
        border-radius: 8px;
    }
}
</style>