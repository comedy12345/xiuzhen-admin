<template>
    <div class="game-services-container">
        <GameServicesTable :columns="columns">

        </GameServicesTable>
    </div>

</template>

<script lang="ts" setup>
import { columns } from '@/config/gameServicesConfig';
import GameServicesTable from "./componets/GameServicesTable.vue";
</script>

<style lang="scss" scoped>
.game-services-container {
    min-width: 1240px;
    margin: 0 auto;
}
</style>