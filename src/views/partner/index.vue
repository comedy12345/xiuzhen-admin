<template>
    <div class="partner-container">
        <HeaderOperation @add="handlerAdd"></HeaderOperation>
        <div class="table-box">
            <a-table :dataSource="dataSource" rowKey="tid" :columns="columns"
                     size="small" bordered>
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'action'">
                        <a-button type="text" style="color: #1890FF;">编辑</a-button>
                        <a-button type="text" style="color: red;">删除</a-button>
                    </template>
                </template>
            </a-table>
        </div>
        <EditPartner ref="editPartnerRef"></EditPartner>
    </div>
</template>
    
<script setup lang='ts'>
import HeaderOperation from './components/HeaderOperation.vue';
import EditPartner from './components/EditPartner.vue';
import { dataSource, columns } from '@/config/partnerConfig';
import { ref } from 'vue';
const editPartnerRef = ref<any>(null);
const handlerAdd = () => {
    editPartnerRef.value.visible = true;
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
</style>