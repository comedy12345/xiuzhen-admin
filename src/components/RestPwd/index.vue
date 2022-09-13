<!--
 * @Description: 重设密码组件
 * @Author: ljf
 * @Date: 2022-09-13 15:30:40
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-13 15:59:58
-->

<template>
    <a-button type="text" style="color: #1890FF;" @click="resetPwd()">
        重设密码
    </a-button>
    <a-modal v-model:visible="visible" title="重设密码" @ok="handleOk">
        <a-input v-model:value="pwd" placeholder="请输入修改的密码"></a-input>
    </a-modal>
</template>

<script lang="ts" setup>
import { resetPassword } from '@/api/userApi';
import { message } from 'ant-design-vue';
import { ref } from 'vue';
const props = defineProps({
    tid: {
        type: Number,
        defalut: undefined
    }
})
const visible = ref(false);
const pwd = ref('')
const resetPwd = () => {
    visible.value = true;
}
const handleOk = async () => {
    const res = await resetPassword({ tid: props.tid, passwd: pwd.value });
    visible.value = false;
    message.success(res.data);
}
</script>