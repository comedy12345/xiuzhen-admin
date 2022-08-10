<template>
    <div class="header-operation-container">
        <div class="query-operation-box">
            <a-form layout="inline">
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