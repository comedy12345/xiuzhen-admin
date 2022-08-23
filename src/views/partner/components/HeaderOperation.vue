<!--
 * @Description: 伙伴信息头部
 * @Author: ljf
 * @Date: 2022-08-11 09:16:46
 * @LastEditors: ljf
 * @LastEditTime: 2022-08-23 09:38:21
-->
<template>
    <div class="header-operation-container">
        <div class="other-operation-box">
            <a-button type="primary" @click="handlerAdd">新增</a-button>
        </div>

    </div>
</template>
    
<script setup lang='ts'>
const emit = defineEmits(['add'])
const handlerAdd = () => {
    emit('add');
}
</script>
<style lang="scss" scoped>
.header-operation-container {
    background-color: white;
    padding: 10px 20px;
    border-radius: 8px;
    display: flex;
    margin-bottom: 10px;
}
</style>