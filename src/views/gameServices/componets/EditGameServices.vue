<template>
    <a-modal v-model:visible="visible" :title="title" @ok="handleOk" @cancel="handleCancel" ok-text="保存"
        cancel-text="取消" :confirm-loading="confirmLoading">

        <a-form ref="gameServicesFormRef" :model="gameServicesForm" name="gameServicesForm" autocomplete="off"
            :label-col="{ span: 6, }">
            <a-form-item label=" 游戏服务名" name="serverName" :rules="[{ required: true, message: '请输入游戏服务名' }]">
                <a-input v-model:value="gameServicesForm.serverName" placeholder="请输入游戏服务名" />
            </a-form-item>
            <a-form-item label="父级游戏服务" name="parentTid">
                <a-select ref="select" v-model:value="gameServicesForm.parentTid">
                    <a-select-option :value="0">无父级游戏服务</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="服务状态" name="parentTid">
                <a-select ref="select" v-model:value="gameServicesForm.stat">
                    <a-select-option v-for="{ value, text } in status" :value="value">{{ text }}</a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
    </a-modal>

</template>
    
<script setup lang='ts'>
import { ref, defineExpose, defineProps, toRefs, watch, defineEmits } from 'vue';
import { IGameServicesForm } from '@/api/gameServices/gameServicesTypes';
import { saveGameServices } from '@/api/gameServices/gameServicesApi';
import { message } from 'ant-design-vue';
import { status } from '../config';
import { runRequst } from '@/utils/ExceptionCapture';

// 自定义属性
const props = defineProps({
    editGameService: {
        type: Object as () => IGameServicesForm,
        default: () => ({
            parentTid: 0,
            serverName: ''
        })
    },
    type: {
        type: String,
        default: 'add'
    }
});

// 自定义事件
const emit = defineEmits(['success'])

const { editGameService, type } = toRefs(props);

// 模态框显示隐藏状态
const visible = ref(false);

// 编辑form表单ref
const gameServicesFormRef = ref<any>(null);

// 保存按钮状态
const confirmLoading = ref(false);

// 表单初始数据
const gameServicesForm = ref<IGameServicesForm>({
    parentTid: 0,
    serverName: "",
    stat: 1,
})

// 动态展示标题
const title = ref('新增游戏服务');
if (type.value === 'update') {
    title.value = '修改游戏服务';
}

// 编辑回显
watch(() => editGameService, () => {
    gameServicesForm.value = { ...editGameService.value }
}, { deep: true })

// 提交表单
const handleOk = () => {
    gameServicesFormRef.value.validate().then(async () => {
        runRequst(saveGameServicesHandle, confirmLoading, gameServicesForm.value);
    });
}
const handleCancel = () => {
    gameServicesFormRef.value.resetFields();
    visible.value = false;
}

// 保存游戏服务
const saveGameServicesHandle = async () => {
    const { data } = await saveGameServices(gameServicesForm.value);
    gameServicesFormRef.value.resetFields();
    message.success(data);
    visible.value = false;
    emit('success')
}
// 提供属性或方法给父级
defineExpose({
    visible
})


</script>
    
<style>
</style>