<template>
    <a-modal v-model:visible="visible" :title="title" @ok="handleOk" @cancel="handleCancel"
             ok-text="保存"
             cancel-text="取消" :confirm-loading="confirmLoading">

        <a-form ref="gameServicesFormRef" :model="gameServicesForm" name="gameServicesForm"
                autocomplete="off"
                :label-col="{ span: 6, }">
            <a-form-item label=" 游戏服务名" name="serverName"
                         :rules="[{ required: true, message: '请输入游戏服务名' }]">
                <a-input v-model:value="gameServicesForm.serverName" placeholder="请输入游戏服务名" />
            </a-form-item>
            <a-form-item label="父级游戏服务" name="parentTid">
                <a-select ref="select" :loading="selectLoading"
                          v-model:value="gameServicesForm.parentTid">
                    <a-select-option :value="0">无父级游戏服务</a-select-option>
                    <a-select-option v-for="{ tid, serverName } in selectData" :value="tid">{{
                            serverName
                    }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="服务状态" name="parentTid">
                <a-select ref="select" v-model:value="gameServicesForm.stat">
                    <a-select-option v-for="{ value, text } in status" :value="value">{{ text }}
                    </a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
    </a-modal>

</template>
    
<script setup lang='ts'>
import { onMounted, ref, toRefs, watch } from 'vue';
import { IGameServicesForm, IGameServicesList } from '@/interface/gameServicesTypes';
import { saveGameServices, queryGameServices } from '@/api/gameServices/gameServicesApi';
import { message } from 'ant-design-vue';
import { status } from '@/config/gameServicesConfig';

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
const { editGameService, type } = toRefs(props)

const emit = defineEmits(['refresh-table']);
onMounted(() => {
    handleFocus();
})


const visible = ref(false);

const gameServicesFormRef = ref<any>(null);

const confirmLoading = ref(false);

const selectLoading = ref(false);

// 表单初始数据
const gameServicesForm = ref<IGameServicesForm>({
    parentTid: 0,
    serverName: "",
    stat: 1,
});

// 父级游戏服务
const selectData = ref<IGameServicesList[]>();

const title = ref('新增游戏服务');
if (type.value === 'update') {
    title.value = '修改游戏服务';
}

// 编辑回显
watch(() => editGameService, () => {
    gameServicesForm.value = { ...editGameService.value }
}, { deep: true })

const handleOk = () => {
    gameServicesFormRef.value.validate().then(async () => {
        const { data } = await saveGameServices(gameServicesForm.value, confirmLoading);
        gameServicesFormRef.value.resetFields();
        message.success(data);
        visible.value = false;
        emit('refresh-table')
    });
}

const handleCancel = () => {
    gameServicesFormRef.value.resetFields();
    visible.value = false;
}

const handleFocus = async () => {
    const res = await queryGameServices({ size: 10000, current: 1, columns: [{ func: 'eq', name: 'parentTid', value: 0 }] }, selectLoading);
    selectData.value = res.data.records;
}

defineExpose({
    visible
})


</script>
    
<style>
</style>