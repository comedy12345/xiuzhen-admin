<!--
 * @Description: 游戏服务页面头部
 * @Author: ljf
 * @Date: 2022-07-26 09:05:35
 * @LastEditors: ljf
 * @LastEditTime: 2022-08-11 11:27:01
-->
<template>
    <div class="hand-action-container">
        <a-button type="primary" @click="add">
            <template #icon>
                <plus-circle-outlined />
            </template>
            新增
        </a-button>
        <edit-game-services v-if="isShowEdit" ref="editGameServicesRef"
                            @success="emit('refresh-table')"></edit-game-services>
    </div>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import EditGameServices from './EditGameServices.vue';
const emit = defineEmits(['refresh-table']);
const editGameServicesRef = ref<InstanceType<typeof EditGameServices> | null>(null)
const isShowEdit = ref(false);
const add = () => {
    isShowEdit.value = true;
    editGameServicesRef.value!.visible = true;
}
</script>

<style lang="scss" scoped>
.hand-action-container {
    margin-bottom: 10px;
    background-color: white;
    padding: 10px 20px;
    border-radius: 8px;
}
</style>