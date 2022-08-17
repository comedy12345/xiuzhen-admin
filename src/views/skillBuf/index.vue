<!--
 * @Description: 技能buf页面
 * @Author: ljf
 * @Date: 2022-07-26 09:05:35
 * @LastEditors: ljf
 * @LastEditTime: 2022-08-17 16:55:32
-->
<template>
    <div class="skill-buf">
        <HeaderOperation @on-ok="skillBufTableRef?.getSkillBufs()"></HeaderOperation>
        <SkillBufTable ref="skillBufTableRef"></SkillBufTable>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import HeaderOperation from './components/HeaderOperation.vue';
import SkillBufTable from './components/SkillBufTable.vue';
const skillBufTableRef = ref<InstanceType<typeof SkillBufTable> | null>(null);

</script>
    
<style lang="scss" scoped>
.skill-buf {
    min-width: 1240px;
    margin: 0 auto;
}
</style>