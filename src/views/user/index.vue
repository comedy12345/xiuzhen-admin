<template>
    <div class="user-container">
        <HeaderOperation @add="handlerAdd"></HeaderOperation>
        <div class="table-box">
            <a-table :dataSource="dataSource" rowKey="tid" :columns="columns"
                     size="small" bordered>
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'action'">
                        <a-button type="text" style="color: #1890FF;"
                                  @click="handlerSeeUserPartner">
                            查看用户伙伴
                        </a-button>
                        <a-button type="text" style="color: #1890FF;">编辑</a-button>
                        <a-button type="text" style="color: red;">删除</a-button>
                    </template>
                </template>
            </a-table>
        </div>
        <EditUser ref="editUserRef"></EditUser>
        <UserPartner ref="userPartnerRef"></UserPartner>


    </div>
</template>
    
<script setup lang='ts'>
import HeaderOperation from './components/HeaderOperation.vue';
import EditUser from './components/EditUser.vue';
import UserPartner from './components/UserPartner.vue'
import { dataSource, columns } from '@/config/userConfig';
import { ref } from 'vue';
const editUserRef = ref<any>(null);
const userPartnerRef = ref<any>(null);
const handlerAdd = () => {
    editUserRef.value.visible = true;
}
const handlerSeeUserPartner = () => {
    userPartnerRef.value.visible = true;
}
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