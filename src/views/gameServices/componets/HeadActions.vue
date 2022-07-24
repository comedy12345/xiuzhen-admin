<template>
    <div class="hand-action-container">
        <a-form ref="queryFormRef" layout="inline" :model="queryParameter" name="queryParameter" autocomplete="off">
            <a-form-item label=" 游戏服务名" name="serverName">
                <a-input v-model:value="queryParameter!.serverName" placeholder="请输入游戏服务名" />
            </a-form-item>
            <a-form-item label="父级游戏服务" name="parentTid">
                <a-select ref="select" :loading="selectLoading" v-model:value="queryParameter!.parentTid"
                    style="width: 150px;" @focus="handleFocus">
                    <a-select-option :value="0">无父级游戏服务</a-select-option>
                    <a-select-option v-for="{ tid, serverName } in selectData" :value="tid">{{ serverName }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="服务状态" name="parentTid">
                <a-select ref="select" v-model:value="queryParameter!.stat" style="width: 150px;">
                    <a-select-option v-for="{ value, text } in status" :value="value">{{ text }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" @click="emit('success')">
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
                <a-button type="primary" @click="add">
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
import { IGameServicesList, IQueryParameter } from "@/api/gameServices/gameServicesTypes";
import { ref, defineEmits, defineProps } from "vue-demi";
import EditGameServices from './EditGameServices.vue';
import { status } from '../config'
import { runRequst } from "@/utils/ExceptionCapture";
import { queryGameServices } from "@/api/gameServices/gameServicesApi";
// 自定义事件
const emit = defineEmits(['success']);

// 组件自定义属性
defineProps({
    queryParameter: {
        type: Object as () => IQueryParameter,
        require: true
    }
})
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
    emit('success');
}

// 新增
const add = () => {
    editGameServicesRef.value.visible = true;
}

const handleFocus = () => {
    runRequst(handleQueryGameServices, selectLoading)
}
const handleQueryGameServices = async () => {
    const res = await queryGameServices({ parentTid: 0, size: 10000, current: 1 });
    selectData.value = res.data.records;
}
</script>

<style lang="scss" scoped>
.hand-action-container {
    margin-bottom: 20px;
}
</style>