<template>
    <div class="edit-user-container">
        <a-modal v-model:visible="visible" :title="title" @ok="handlerOk" @cancel="handlerCancel"
                 okText="保存"
                 cancel-text="取消" width="40%">
            <a-form>
                <a-form-item label="用户类型" :label-col="{ span: 4 }">
                    <a-radio-group v-model:value="formData.type">
                        <a-radio value="2">玩家</a-radio>
                        <a-radio value="1">代理</a-radio>
                        <a-radio value="0">管理员</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="用户账号" :label-col="{ span: 4 }">
                    <a-input placeholder="请输入用户账号" v-model:value="formData.userName"></a-input>
                </a-form-item>
                <a-form-item v-if="!formData.tid" label="用户密码" :label-col="{ span: 4 }">
                    <a-input placeholder="请输入用户密码" v-model:value="formData.passwd"></a-input>
                </a-form-item>
                <a-form-item label="用户手机号" :label-col="{ span: 4 }">
                    <a-input placeholder="请输入用户手机号" v-model:value="formData.phone"></a-input>
                </a-form-item>
                <a-form-item label="状态" :label-col="{ span: 4 }">
                    <a-switch v-model:checked="formData.state" checked-children="开"
                              un-checked-children="关" :un-checked-value="0" :checked-value="1" />
                </a-form-item>
            </a-form>
        </a-modal>

    </div>
</template>
    
<script setup lang='ts'>
import { saveUser } from '@/api/userApi';
import { IUserForm } from '@/interface/userType';
import { message } from 'ant-design-vue';
import { PropType, ref, toRefs, watchEffect } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: "新增"
    },
    currentEditData: {
        type: Object as PropType<IUserForm>,
        default: () => ({
            type: "2",
            state: 1
        })
    }
});
const { currentEditData } = toRefs(props)
const emit = defineEmits(['ok', 'cancel'])
const visible = ref(false);

const formData = ref<IUserForm>({
    type: "2",
    state: 1
});
watchEffect(() => {
    formData.value = currentEditData.value;
})

const handlerOk = async () => {
    const { data } = await saveUser(formData.value);
    message.success(data);
    emit('ok');
}
const handlerCancel = () => {
    emit('cancel');
}

defineExpose({
    visible: visible
})



</script>
    
<style>
</style>