<template>
    <div class="edit-user-container">
        <a-modal v-model:visible="visible" :title="title" @ok="visible = false"
                 okText="保存"
                 cancel-text="取消" width="40%">
            <a-form>
                <a-form-item label="用户类型" :label-col="{ span: 4 }">
                    <a-select placeholder="请选择用户类型">
                        <a-select-option v-for="({ value, text }, index) in [
                        { value: '1', text: '玩家' },
                        { value: '2', text: '代练' },
                        { value: '3', text: '管理员' }]"
                                         :value="value"
                                         :key="index">
                            {{ text }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="用户账号" :label-col="{ span: 4 }">
                    <a-input placeholder="请输入用户账号"></a-input>
                </a-form-item>
                <a-form-item label="用户密码" :label-col="{ span: 4 }">
                    <a-input placeholder="请输入用户密码"></a-input>
                </a-form-item>
                <a-form-item label="用户手机号" :label-col="{ span: 4 }">
                    <a-input placeholder="请输入用户手机号"></a-input>
                </a-form-item>
            </a-form>
        </a-modal>

    </div>
</template>
    
<script setup lang='ts'>
import { ref } from 'vue';


defineProps({
    title: {
        type: String,
        default: "新增"
    }
});
const visible = ref(false);

defineExpose({
    visible: visible
})



</script>
    
<style>
</style>