<template>
    <div class="partner-skill-container">
        <div class="query-operation-box">
            <a-form v-if="showQuery" layout="inline">
                <a-form-item label="技能名称">
                    <a-input></a-input>
                </a-form-item>
                <a-form-item label="所在区">
                    <a-select v-model:value="value" mode="tags" style="width: 150px"
                              placeholder="选择区"
                              :options="options">
                    </a-select>
                </a-form-item>
                <a-form-item>
                    <a-button>查询</a-button>
                </a-form-item>
            </a-form>
            <a-space :size="10">
                <a-button v-if="!showQuery" type="primary" @click="visible = true">选择伙伴技能</a-button>
                <a-button v-if="!showQuery" type="primary">删除选中的技能</a-button>
            </a-space>
        </div>

        <a-table :dataSource="skillDataSource" :row-selection="rowSelection" rowKey="tid"
                 :columns="skillColumns"
                 size="small" bordered>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-button type="text" style="color: red;">删除</a-button>
                </template>
                <template v-if="column.key === 'is_combine'">
                    {{ record[column.key] ? '是' : '否' }}
                </template>
            </template>
        </a-table>
        <a-modal v-model:visible="visible" title="选择伙伴技能" @ok="visible = false"
                 okText="确定"
                 cancel-text="取消" width="60%">
            <PartnerSkill :show-query="true"></PartnerSkill>
        </a-modal>
    </div>
</template>
    
<script setup lang='ts'>
import PartnerSkill from './PartnerSkill.vue'
import { skillColumns, skillDataSource } from '@/config/partnerConfig';
import { TableProps } from "ant-design-vue";
import { ref } from "vue";
defineProps({
    showQuery: {
        type: Boolean,
        defalut: false
    }
})
const visible = ref(false);
const value = ref();
const options: any = [{ value: '1', label: '一区', }, { value: '2', label: '二区', }];
const rowSelection: TableProps['rowSelection'] = {
    onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },

};
</script>
    
<style lang="scss" scoped>
.partner-skill-container {
    .query-operation-box {
        display: flex;
        margin-bottom: 10px;
    }
}
</style>