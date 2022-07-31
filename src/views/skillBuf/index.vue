<template>
    <div class="skill-buf">
        <HeaderOperation></HeaderOperation>
        <SkillBufTable :columns="columns" :dataSource="dataSource"></SkillBufTable>
    </div>
</template>
    
<script setup lang='ts'>
import HeaderOperation from './components/HeaderOperation.vue';
import SkillBufTable from './components/SkillBufTable.vue';
import { columns, dataSource } from '@/config/skillBufConfig';
</script>
    
<style lang="scss" scoped>
.skill-buf {
    min-width: 1240px;
    margin: 0 auto;
}
</style>