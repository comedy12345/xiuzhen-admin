<template>
    <div class="hand-action-container">
        <a-form ref="queryFormRef" layout="inline" name="queryParameter" autocomplete="off">
            <a-form-item label=" 游戏服务名" name="serverName">
                <a-input placeholder="请输入游戏服务名" v-model:value="queryForm.serverName" />
            </a-form-item>
            <a-form-item label="父级游戏服务" name="parentTid">
                <a-select ref="select" v-model:value="queryForm.parentTid" :loading="selectLoading"
                    placeholder="请选择游戏服务" style="width: 150px;" @focus="handleFocus">
                    <a-select-option :value="0">无父级游戏服务</a-select-option>
                    <a-select-option v-for="{ tid, serverName } in selectData" :value="tid">{{ serverName }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="服务状态" name="parentTid">
                <a-select ref="select" v-model:value="queryForm.stat" placeholder="请选择服务状态" style="width: 150px;">
                    <a-select-option v-for="{ value, text } in status" :value="value">{{ text }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" @click="emit('success', queryParameterColumn)" ghost>
                    <template #icon>
                        <SearchOutlined />
                    </template>
                    查询
                </a-button>
            </a-form-item>
            <a-form-item>
                <a-button @click="reset">
                    <template #icon>
                        <redo-outlined />
                    </template>
                    重置
                </a-button>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" @click="add" ghost>
                    <template #icon>
                        <plus-circle-outlined />
                    </template>
                    新增
                </a-button>
            </a-form-item>
        </a-form>

    </div>
    <edit-game-services ref='editGameServicesRef' @success="emit('success')">
    </edit-game-services>
</template>

<script lang="ts" setup>
import { IGameServicesList } from "@/api/gameServices/gameServicesTypes";
import { ref, defineEmits, defineProps, toRefs, reactive, watch, watchEffect } from "vue";
import EditGameServices from './EditGameServices.vue';
import { status } from '../config'
import { runRequst } from "@/utils/ExceptionCapture";
import { queryGameServices } from "@/api/gameServices/gameServicesApi";
import useQueryParameter from '@/hooks/queryParameter'
// 自定义事件
const emit = defineEmits(['success']);

// 收集查询参数
const { queryForm, queryParameterColumn } = useQueryParameter();


// 查询表单ref
const queryFormRef = ref<any>(null);

// 编辑框Ref
const editGameServicesRef = ref<any>(null);

// 父级游戏服务下拉框loading
const selectLoading = ref(false);

// 父级游戏服务
const selectData = ref<IGameServicesList[]>();


// 重置
const reset = () => {
    queryFormRef.value.resetFields();
    emit('success', queryParameterColumn.value)
}

// 新增
const add = () => {
    editGameServicesRef.value.visible = true;
}

const handleFocus = () => {
    runRequst(handleQueryGameServices, selectLoading)
}
const handleQueryGameServices = async () => {
    const res = await queryGameServices({ size: 10000, current: 1, columns: [{ func: 'eq', name: 'parentTid', value: 0 }] });
    selectData.value = res.data.records;
}
</script>

<style lang="scss" scoped>
.hand-action-container {
    margin-bottom: 20px;
}
</style>