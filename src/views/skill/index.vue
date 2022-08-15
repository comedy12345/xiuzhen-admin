<template>
    <div class="skill-container">
        <HeaderOperation @refresh-table="() => skillTableRef?.getSkills()"></HeaderOperation>
        <SkillTable @child-skill="handlerChildSkill" ref="skillTableRef">
        </SkillTable>
        <ChildSkill v-if="childSkillShow" ref="childSkillRef" :cucrrentSkill="cucrrentSkill"
                    @close="handlerClose" @ok="() => skillTableRef?.getSkills()"></ChildSkill>
    </div>
</template>
    
<script setup lang='ts'>
import HeaderOperation from './components/HeaderOperation.vue';
import SkillTable from './components/SkillTable.vue';
import ChildSkill from './components/ChildSkill.vue'
import { nextTick, ref } from 'vue';
import { ISkillList } from '@/interface/skillTypes';

const childSkillRef = ref<InstanceType<typeof ChildSkill> | null>(null);

const skillTableRef = ref<InstanceType<typeof SkillTable> | null>(null);

const childSkillShow = ref(false);
const cucrrentSkill = ref<ISkillList>()
// 打开子技能弹出层
const handlerChildSkill = (skill: ISkillList) => {
    childSkillShow.value = true;
    nextTick(() => {
        childSkillRef.value!.showList = true;
        cucrrentSkill.value = skill;
    })
}
const handlerClose = () => {
    childSkillShow.value = false;
}


</script>
<style>
.skill-container {
    /* min-width: 1240px;
    margin: 0 auto; */
}
</style>
    
