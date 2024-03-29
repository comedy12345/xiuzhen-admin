
<template>
    <div class="child-skill">
        <a-modal v-if="isModal && showList"
                 centered
                 v-model:visible="showList"
                 title="关联技能列表"
                 width="80%"
                 :bodyStyle="{ overflow: 'auto' }"
                 :confirm-loading="confirmLoading"
                 class="child-modal"
                 cancelText="取消" okText="保存"
                 @ok="handlerSaveSkill"
                 @cancel="handlerClose">
            <div>
                <a-button v-if="detail" style="margin:10px 0 0 18px" @click="() => showAddList = true"
                          type="primary">
                    选择技能
                </a-button>
                <SkillTable :dataSource="dataSource"
                            :is-cache-del="true"
                            :is-relation-skill="true"
                            :is-drag-sort="true"
                            :is-open-pagination="false"
                            :is-hide-screen="true"
                            :is-single-point="isSinglePoint"
                            :detail="detail"
                            @del-skill-single="handlerDelSkillSingle"
                            @del-skill="handlerDelSkill">
                </SkillTable>
            </div>
            <template v-if="isSinglePoint" #footer>

            </template>
        </a-modal>
        <div v-else-if="!isModal">
            <a-button style="margin:10px 0 0 18px" @click="() => showAddList = true"
                      type="primary">
                选择技能
            </a-button>
            <SkillTable :dataSource="dataSource"
                        :is-cache-del="true"
                        :is-relation-skill="true"
                        :is-open-pagination="false"
                        :is-hide-screen="true"
                        @del-skill="handlerDelSkill">
            </SkillTable>
        </div>
        <a-modal v-if="showAddList"
                 centered
                 v-model:visible="showAddList"
                 title="选择技能"
                 width="80%"
                 cancelText="取消" okText="确定"
                 :confirm-loading="confirmLoading"
                 @ok="handlerOk">
            <SkillTable
                        :is-del-action="true"
                        :is-open-multiple="true"
                        :selectedRowKeys="selectedRowKeys"
                        :is-combine="skillTid !== ''"
                        @get-Select-skill="getSelectSkills"
                        @get-select-all-skill="getSelectAllSkills">
            </SkillTable>

        </a-modal>
    </div>
</template>
    
<script setup lang='ts'>
import { ISkillForm, ISkillList } from '@/interface/skillTypes';
import { reactive, ref, toRefs, watchEffect } from 'vue';
import SkillTable from "@/components/SkillTable/index.vue";
import { saveSkill, getChildSkill, getSkilldd } from '@/api/skillApi';
import { message } from 'ant-design-vue';
import { IBaseQueryParameter } from '@/interface/types';
import { queryPartnerSkill, savePartnerSkill, deleteSkill } from '@/api/partnerApi';
import { IPartnerList } from '@/interface/partnerType';
const props = defineProps({
    // 通过技能tid查询子技能
    skillTid: {
        type: String,
        default: ''
    },
    // 通过bufTid查询追加的技能
    bufTid: {
        type: String,
        default: ''
    },
    // 伙伴Tid
    partner: {
        type: Object as () => IPartnerList,
        default: {}
    },

    // 追加的技能sid
    saddRef: {
        type: String,
        default: ''
    },
    // 是否开启弹出层
    isModal: {
        type: Boolean,
        default: true
    },
    isSinglePoint: {
        type: Boolean,
        default: false
    },
    detail:{
        type: Boolean,
        default: true
    }
})

const { skillTid, isModal, bufTid, isSinglePoint, partner } = toRefs(props)
const emit = defineEmits(['close', 'ok', 'update:saddRef']);
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

// 本地删除
const handlerDelSkill = (skills: ISkillList[]) => {
    slectedSkills.value = skills;
    dataSource.value = skills;
    selectedRowKeys.value = skills.map(item => item.tid);
    if (!isModal.value) {
        emit('update:saddRef', dataSource.value.map(item => item.sid).join(','));
    }
}
// 后台删除
const handlerDelSkillSingle = async (tid: string) => {
    const { data } = await deleteSkill(tid);
    message.success(data);
    getPartnerSkill();
}

// 存储最终选择的技能
const dataSource = ref<ISkillList[]>([]);


const handlerOk = async () => {
    showAddList.value = false;
    // 直接保存
    if (isSinglePoint.value) {
        const relationSkill: { skillSid: string, partnerSid: string }[] = slectedSkills.value.filter(item => {
            return !originalKeys.value.some(keyItem => keyItem === item.tid);
        }).map(item => {
            return { skillSid: item.sid, partnerSid: partner.value.sid! }
        })
        const { data } = await savePartnerSkill(relationSkill, confirmLoading);
        message.success(data);
        getPartnerSkill();
        return;
    }
    // 本地保存
    dataSource.value = slectedSkills.value;
    // 如果不是弹窗形式的直接把技能sid发过去
    if (!isModal.value) {
        emit('update:saddRef', dataSource.value.map(item => item.sid).join(','));
    }
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

const getChild = async () => {
    queryParameter.columns = [{ func: 'eq', name: 'tid', value: skillTid.value }];
    const { data: { records } } = await getChildSkill(queryParameter);
    dataSource.value = records;
    slectedSkills.value = [...records];
    selectedRowKeys.value = records.map(item => item.tid);
}

const getBufSkill = async () => {
    const { data } = await getSkilldd({ tid: bufTid.value });
    dataSource.value = data;
    slectedSkills.value = [...data];
    selectedRowKeys.value = data.map((item) => item.tid);
}
// 保存已经保存的数据
const originalKeys = ref<string[]>([]);
const getPartnerSkill = async () => {
    const { data } = await queryPartnerSkill(partner.value.tid!);
    dataSource.value = data;
    slectedSkills.value = [...data];
    selectedRowKeys.value = data.map((item) => item.tid);
    originalKeys.value = [...selectedRowKeys.value];
}

watchEffect(() => {
    if (!showList.value) return;
    if (skillTid.value) getChild();
    if (bufTid.value) getBufSkill();
    if (partner.value.tid) getPartnerSkill();
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