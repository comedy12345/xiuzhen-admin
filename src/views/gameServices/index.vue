<!--
 * @Description: 游戏服务页面
 * @Author: ljf
 * @Date: 2022-07-26 09:05:35
 * @LastEditors: ljf
 * @LastEditTime: 2022-08-17 16:11:59
-->
<template>
    <div class="game-services-container">
        <GameServicesTable :columns="columns"></GameServicesTable>
    </div>
</template>

<script lang="ts" setup name="/gameServices">
import { columns } from '@/config/gameServicesConfig';
import GameServicesTable from "./componets/GameServicesTable.vue";
</script>

<style lang="scss" scoped>
.game-services-container {
    min-width: 1240px;
    margin: 0 auto;
}
</style>