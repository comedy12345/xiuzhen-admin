<!--
 * @Description: 游戏服务搜索
 * @Author: ljf
 * @Date: 2022-07-26 09:05:35
 * @LastEditors: ljf
 * @LastEditTime: 2022-07-26 11:42:01
-->
<template>
    <div class="hand-action-container">
        <a-button type="primary" @click="add">
            <template #icon>
                <plus-circle-outlined />
            </template>
            新增
        </a-button>
        <edit-game-services ref='editGameServicesRef' @success="emit('refresh-table')">
        </edit-game-services>
    </div>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import EditGameServices from './EditGameServices.vue';
const emit = defineEmits(['refresh-table']);
const editGameServicesRef = ref<any>(null);
const add = () => {
    editGameServicesRef.value.visible = true;
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