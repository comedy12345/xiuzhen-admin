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