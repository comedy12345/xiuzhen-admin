<template>
    <div class="skill-buf-table-container">
        <a-table :dataSource="dataSource" :columns="columns" bordered size="small">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-button type="text" style="color: #1890FF;">编辑</a-button>
                    <a-button type="text" style="color: red;">删除</a-button>
                </template>
            </template>
        </a-table>
    </div>
</template>
    
<script setup lang='ts'>
import { ColumnsType } from 'ant-design-vue/es/table/Table';
import { useRouter } from 'vue-router'
const router = useRouter();
const { columns, dataSource } = defineProps({
    columns: {
        type: Object as () => ColumnsType,
        required: true
    },
    dataSource: {
        type: Object as any,
        required: true
    }
});

</script>
    
<style lang="scss" scoped>
.skill-buf-table-container {
    padding: 20px;
    background-color: white;
    border-radius: 8px;



}
</style>