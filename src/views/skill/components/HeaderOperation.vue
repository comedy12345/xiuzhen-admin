<template>
    <div class="header-operation-container">
        <div class="query-operation-box">
            <a-form layout="inline">
                <a-form-item label="技能名称">
                    <a-input></a-input>
                </a-form-item>
                <a-form-item label="所在区">
                    <a-select v-model:value="value" mode="tags" style="width: 150px" placeholder="选择区"
                              :options="options">
                    </a-select>
                </a-form-item>
                <a-form-item>
                    <a-button>查询</a-button>
                </a-form-item>
            </a-form>
        </div>
        <div class="other-operation-box">
            <a-button type="primary" @click="handlerAddSkill">新增</a-button>
        </div>
    </div>
    <EditSkill v-if="showEditSkill" @close-edit-skill="showEditSkill = false"></EditSkill>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import EditSkill from '../components/EditSkill.vue';
const value = ref();
const options: any = [{ value: '1', label: '一区', }, { value: '2', label: '二区', }];


const showEditSkill = ref(false);
const handlerAddSkill = () => {
    showEditSkill.value = true;
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
