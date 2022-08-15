<template>
    <div class="child-skill">
        <a-modal style="top: 20px"
                 v-model:visible="showList"
                 title="子技能列表"
                 width="80%"
                 :bodyStyle="{ height: '75vh', overflow: 'auto' }"
                 :confirm-loading="confirmLoading"
                 class="child-modal"
                 @ok="handlerSaveSkill"
                 @cancel="handlerClose">
            <div>
                <a-button style="margin:10px 0 0 18px" @click="() => showAddList = true">
                    选择子技能
                </a-button>
                <SkillTable :dataSource="dataSource" :isChild="true"
                            @del-skill="handlerDelSkill"
                            :isSort="true">
                </SkillTable>
            </div>
        </a-modal>
        <a-modal style="top: 20px"
                 v-model:visible="showAddList"
                 title="选择子技能"
                 width="80%"
                 @ok="handlerOk">
            <SkillTable :isChild="true"
                        :selectedRowKeys="selectedRowKeys"
                        @get-Select-skill="getSelectSkills">
            </SkillTable>
        </a-modal>
    </div>
</template>
    
<script setup lang='ts'>
import { ISkillForm, ISkillList } from '@/interface/skillTypes';
import { onMounted, reactive, ref, toRefs, watchEffect } from 'vue';
import SkillTable from "./SkillTable.vue";
import { saveSkill, getChildSkill } from '@/api/skillApi';
import { message } from 'ant-design-vue';
import { uniqBy } from "lodash";
import { IBaseQueryParameter } from '@/interface/types';
const props = defineProps({
    cucrrentSkill: {
        type: Object as () => ISkillList,
        default: {}
    },
})

const { cucrrentSkill } = toRefs(props)
const emit = defineEmits(['close', 'ok']);
// 是否子技能排序列表
const showList = ref(false);
// 是否选择子技能列表
const showAddList = ref(false);
// 当前选中技能
const slectedSkills = ref<ISkillList[]>([]);

// 获取选中数据
const getSelectSkills = (skill: ISkillList, selected: boolean) => {
    if (selected) {
        slectedSkills.value.push(skill);
        selectedRowKeys.value.push(skill.tid);
        return;
    }
    slectedSkills.value = slectedSkills.value.filter(item => item.tid !== skill.tid);
    selectedRowKeys.value = selectedRowKeys.value.filter(item => item !== skill.tid);
}


// 删除数据
const handlerDelSkill = (skills: ISkillList[]) => {
    dataSource.value = skills;
}

// 存储当前确定选择的子技能列表
const dataSource = ref<ISkillList[]>([]);

// 确定选择
const handlerOk = () => {
    dataSource.value = uniqBy([...dataSource.value, ...slectedSkills.value], 'tid');
    showAddList.value = false;
}

// 存储子技能提交数据
const skillForm = ref<ISkillForm>({});
const confirmLoading = ref(false);
// 提交选择
const handlerSaveSkill = async () => {
    skillForm.value!.tid = cucrrentSkill.value.tid;
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
const selectedRowKeys = ref<string[]>([]);

const queryParameter = reactive<IBaseQueryParameter>({
    size: 999,
    current: 1,
    columns: []
});
// 初始化子技能列表
const getChild = async () => {
    queryParameter.columns = [{ func: 'eq', name: 'tid', value: cucrrentSkill.value.tid }];
    const { data: { records } } = await getChildSkill(queryParameter);
    dataSource.value = records;
    selectedRowKeys.value = records.map(item => item.tid);
}
watchEffect(() => {
    if (cucrrentSkill.value.tid) {
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