<template>
    <div class="header-operation-container">
        <div class="query-operation-box">
            <a-form layout="inline">
                <a-form-item label="用户类型">
                    <a-select placeholder="请选择用户类型" style="width: 150px;">
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

                <a-form-item label="用户账号">
                    <a-input placeholder="请输入用户账号"></a-input>
                </a-form-item>

                <a-form-item label="用户手机号">
                    <a-input placeholder="请输入用户手机号"></a-input>
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