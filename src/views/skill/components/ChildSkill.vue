
<template>
    <div class="child-skill">
        <a-modal centered
                 v-model:visible="showList"
                 title="子技能列表"
                 width="80%"
                 :bodyStyle="{ overflow: 'auto' }"
                 :confirm-loading="confirmLoading"
                 class="child-modal"
                 cancelText="取消" okText="保存"
                 @ok="handlerSaveSkill"
                 @cancel="handlerClose">
            <div>
                <a-button style="margin:10px 0 0 18px" @click="() => showAddList = true" type="primary">
                    选择子技能
                </a-button>
                <SkillTable :dataSource="dataSource" :isChild="true" :isSort="true"
                            @del-skill="handlerDelSkill">
                </SkillTable>
            </div>
        </a-modal>
        <a-modal centered
                 v-model:visible="showAddList"
                 title="选择子技能"
                 width="80%"
                 cancelText="取消" okText="确定"
                 @ok="handlerOk">
            <SkillTable :isChild="true"
                        :selectedRowKeys="selectedRowKeys"
                        @get-Select-skill="getSelectSkills"
                        @get-select-all-skill="getSelectAllSkills">
            </SkillTable>
        </a-modal>
    </div>
</template>
    
<script setup lang='ts'>
import { ISkillForm, ISkillList } from '@/interface/skillTypes';
import { reactive, ref, toRefs, watchEffect } from 'vue';
import SkillTable from "./SkillTable.vue";
import { saveSkill, getChildSkill } from '@/api/skillApi';
import { message } from 'ant-design-vue';
import { IBaseQueryParameter } from '@/interface/types';
const props = defineProps({
    skillTid: {
        type: String,
        default: ''
    },
})

const { skillTid } = toRefs(props)
const emit = defineEmits(['close', 'ok']);
// 弹出层开关
const showList = ref(false);
const showAddList = ref(false);


// 点确定之前选择的的技能
const slectedSkills = ref<ISkillList[]>([]);

// 点击选择或取消选择
const getSelectSkills = (skill: ISkillList, selected: boolean) => {
    if (selected) {
        slectedSkills.value.push(skill);
        selectedRowKeys.value.push(skill.tid);
        return;
    }
    slectedSkills.value = slectedSkills.value.filter(item => item.tid !== skill.tid);
    selectedRowKeys.value = selectedRowKeys.value.filter(item => item !== skill.tid);
}

// 全选或反选
const getSelectAllSkills = (selected: boolean, skills: ISkillList[]) => {
    if (selected) {
        slectedSkills.value.push(...skills);
        selectedRowKeys.value.push(...skills.map(item => item.tid));
        return;
    }
    const newSkills = skills.reduce((preV: ISkillList[], curV: ISkillList): ISkillList[] => {
        const index = preV.findIndex(item => item.tid === curV.tid);
        if (index !== -1) {
            preV.splice(index, 1);
        }
        return preV;
    }, slectedSkills.value);
    selectedRowKeys.value = newSkills.map(item => item.tid);
}


const handlerDelSkill = (skills: ISkillList[]) => {
    slectedSkills.value = skills;
    dataSource.value = skills;
    selectedRowKeys.value = skills.map(item => item.tid);
}

// 存储确定选择的技能
const dataSource = ref<ISkillList[]>([]);

const handlerOk = () => {
    dataSource.value = slectedSkills.value;
    showAddList.value = false;
}

// 存储子技能提交数据
const skillForm = ref<ISkillForm>({});
const confirmLoading = ref(false);
const handlerSaveSkill = async () => {
    skillForm.value!.tid = skillTid.value;
    skillForm.value.combineSkLs = dataSource.value.map(item => {
        const id = item.sid;
        return id;
    }).join(',');

    const { data } = await saveSkill(skillForm.value, confirmLoading);
    message.success(data);
    handlerClose();
    emit('ok');
}
// 关闭子技能列表
const handlerClose = () => {
    showList.value = false;
    emit('close');
}

// 已选中的tid
const selectedRowKeys = ref<string[]>([]);

const queryParameter = reactive<IBaseQueryParameter>({
    size: 999,
    current: 1,
    columns: []
});
// 初始化子技能列表
const getChild = async () => {
    queryParameter.columns = [{ func: 'eq', name: 'tid', value: skillTid.value }];
    const { data: { records } } = await getChildSkill(queryParameter);
    dataSource.value = records;
    slectedSkills.value = records;
    selectedRowKeys.value = records.map(item => item.tid);
}
watchEffect(() => {
    if (skillTid.value) {
        getChild();
    }
})

defineExpose({
    showList
})
</script>
    
<style lang="scss">
.ant-modal-body {
    padding: 5px 20px;
}
</style>