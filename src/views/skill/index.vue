<!--
 * @Description: 技能管理页面
 * @Author: ljf
 * @Date: 2022-08-11 09:16:46
 * @LastEditors: ljf
 * @LastEditTime: 2022-08-17 16:11:52
-->
<template>
    <div class="skill-container">
        <HeaderOperation @refresh-table="() => skillTableRef?.getSkills()"></HeaderOperation>
        <SkillTable ref="skillTableRef" @child-skill="handlerChildSkill"></SkillTable>
        <ChoiceSkill v-if="childSkillShow" ref="choiceSkillRef" :skill-tid="skillTid"
                     @close="handlerClose" @ok="() => skillTableRef?.getSkills()">
        </ChoiceSkill>
    </div>
</template>
    

<script setup lang='ts' name="/skill">
import HeaderOperation from './components/HeaderOperation.vue';
import SkillTable from '@/components/SkillTable/index.vue';
import ChoiceSkill from '@/components/ChoiceSkill/index.vue';
import { nextTick, ref } from 'vue';

const choiceSkillRef = ref<InstanceType<typeof ChoiceSkill> | null>(null);

const skillTableRef = ref<InstanceType<typeof SkillTable> | null>(null);

const childSkillShow = ref(false);
const skillTid = ref('')
// 打开子技能弹出层
const handlerChildSkill = (tid: string) => {
    childSkillShow.value = true;
    nextTick(() => {
        choiceSkillRef.value!.showList = true;
        skillTid.value = tid;
    })
}
const handlerClose = () => {
    childSkillShow.value = false;
}
</script>

    
