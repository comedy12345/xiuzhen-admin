<template>
    <div class="header-operation-container">
        <div class="other-operation-box">
            <a-button type="primary" @click="handlerAddSkill">新增</a-button>
        </div>
    </div>
    <EditSkill v-if="showEditSkill" @close-edit-skill="showEditSkill = false"
               @on-ok="emit('refresh-table')"></EditSkill>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import EditSkill from '../components/EditSkill.vue';

const showEditSkill = ref(false);
const emit = defineEmits(['refresh-table'])
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
