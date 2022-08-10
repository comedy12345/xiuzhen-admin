<template>
    <div class="user-partner-container">
        <a-modal v-model:visible="visible" title="用户伙伴" style="height: auto;"
                 width="60%" :footer="null" centered>
            <div style="margin-bottom: 10px;">
                <a-form layout="inline">
                    <a-form-item label="区服">
                        <a-select placeholder="请选择区服" style="width: 150px;">
                            <a-select-option v-for="({ value, text }, index) in [
                                { value: '1', text: '一区' },
                                { value: '2', text: '二区' },
                            ]"
                                             :value="value"
                                             :key="index">
                                {{ text }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item label="职业">
                        <a-input placeholder="请输入职业名称"></a-input>
                    </a-form-item>

                    <a-form-item label="伙伴名称">
                        <a-input placeholder="请输入伙伴名称"></a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary">查询</a-button>
                    </a-form-item>
                </a-form>
            </div>
            <a-table :columns="columns" :data-source="dataSource" rowKey="tid"
                     :scroll="{ y: 490 }">
                <template #expandedRowRender="{ record }">
                    <a-descriptions title="伙伴数据详情" bordered
                                    :labelStyle="{ backgroundColor: '#d8d8d8' }" size="small">
                        <a-descriptions-item label="伙伴名称">11111111</a-descriptions-item>
                        <a-descriptions-item label="所在区">一区</a-descriptions-item>
                        <a-descriptions-item label="职业">zyyy</a-descriptions-item>
                        <a-descriptions-item label="是否主伙伴">是</a-descriptions-item>
                        <a-descriptions-item label="是否上阵">是</a-descriptions-item>
                        <a-descriptions-item label="血量">100 </a-descriptions-item>
                        <a-descriptions-item label="最大血量">100</a-descriptions-item>
                        <a-descriptions-item label="能量">100</a-descriptions-item>
                        <a-descriptions-item label="最大能量">200</a-descriptions-item>
                        <a-descriptions-item label="修为">1000</a-descriptions-item>
                        <a-descriptions-item label="等级">1000</a-descriptions-item>
                        <a-descriptions-item label="攻击力">1000</a-descriptions-item>
                        <a-descriptions-item label="物防">1000</a-descriptions-item>
                        <a-descriptions-item label="法防">1000</a-descriptions-item>
                        <a-descriptions-item label="命中">1000</a-descriptions-item>
                        <a-descriptions-item label="闪避">1000</a-descriptions-item>
                        <a-descriptions-item label="暴击">1000</a-descriptions-item>
                        <a-descriptions-item label="抗暴">1000</a-descriptions-item>
                        <a-descriptions-item label="灵币">1000</a-descriptions-item>
                        <a-descriptions-item label="仙缘">1000</a-descriptions-item>
                        <a-descriptions-item label="灵液">1000</a-descriptions-item>
                        <a-descriptions-item label="最大灵液">1000</a-descriptions-item>
                        <a-descriptions-item label="品质">1000</a-descriptions-item>
                        <a-descriptions-item label="进阶">1000</a-descriptions-item>
                        <a-descriptions-item label="种族">1000</a-descriptions-item>
                        <a-descriptions-item label="飞升">1000</a-descriptions-item>
                        <a-descriptions-item label="轮回">1000</a-descriptions-item>
                        <a-descriptions-item label="升星">1000</a-descriptions-item>

                    </a-descriptions>
                </template>
            </a-table>
        </a-modal>

    </div>
</template>
    
<script setup lang='ts'>
import { ref } from 'vue';
import { columns, dataSource } from "@/config/userPartnerConfig";

defineProps({
    userId: {
        type: String,

    }
});
const visible = ref(false);

defineExpose({
    visible: visible
})



</script>
    
<style lang="scss" scoped>
.user-partner-container {}
</style>