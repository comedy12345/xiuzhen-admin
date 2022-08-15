<template>
    <div class="header-operation-container">
        <div class="other-operation-box">
            <a-button type="primary" @click="handlerAddSkillBuf">新增</a-button>
        </div>
        <EditSkillBuf v-if="showEditSkillBuf" title="新增buf" @close-edit="showEditSkillBuf = false"
                      @on-ok="handlerOk">
        </EditSkillBuf>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import EditSkillBuf from './EditSkillBuf.vue';
const emit = defineEmits(['on-ok']);
const showEditSkillBuf = ref(false);
const handlerAddSkillBuf = () => {
    showEditSkillBuf.value = true;
}
const handlerOk = () => {
    showEditSkillBuf.value = false;
    emit('on-ok');
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
