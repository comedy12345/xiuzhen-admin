<template>
    <div class="skill-container">
        <HeaderOperation></HeaderOperation>
        <SkillTable :columns="columns" :dataSource="dataSource"></SkillTable>
    </div>
</template>
    
<script setup lang='ts'>
import HeaderOperation from './components/HeaderOperation.vue';
import SkillTable from './components/SkillTable.vue';
import { columns, dataSource } from '../../config/skillConfig';
</script>
<style>
.skill-container {
    min-width: 1240px;
    margin: 0 auto;
}
</style>
    
