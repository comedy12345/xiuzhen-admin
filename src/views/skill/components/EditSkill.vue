<template>
    <div class="edit-skill-container">
        <a-modal style="top: 20px;"
                 v-model:visible="visible"
                 :title="title"
                 @ok="handleOk"
                 :afterClose="() => emit('close-Edit-skill')"
                 width="40%"
                 okText="保存"
                 cancel-text="取消"
                 :confirm-loading="confirmLoading">
            <a-form>
                <a-form-item label="所在区" :label-col="{ span: 6 }">
                    <AreaServer v-model:value="formData.domainId">
                    </AreaServer>
                </a-form-item>

                <a-form-item label="技能名称" :label-col="{ span: 6 }">
                    <a-input v-model:value="formData.skillName" placeholder="请输入技能名称" />
                </a-form-item>

                <a-form-item label="固定编号" :label-col="{ span: 6 }">
                    <a-input v-model:value="formData.sid" placeholder="请输入固定编号" />
                </a-form-item>

                <a-form-item label="消耗属性" :label-col="{ span: 6 }">
                    <a-select v-model:value="formData.expendProp"
                              :options="[{ label: '能量', value: 1 }]" placeholder="请选择消耗属性" />
                </a-form-item>

                <a-form-item label="消耗值" :label-col="{ span: 6 }">
                    <a-input v-model:value="formData.expendVal" placeholder="请输入消耗值" />
                </a-form-item>

                <a-form-item label="是否被动技能" :label-col="{ span: 6 }">
                    <a-switch v-model:checked="formData.passivity" checked-children="是"
                              un-checked-children="否" :unCheckedValue="0" :checkedValue="1" />
                </a-form-item>

                <a-form-item v-if="formData.passivity" label="被动触发特性" :label-col="{ span: 6 }">
                    <a-radio-group v-model:value="formData.passivityTriggerOnType">
                        <a-radio v-for="({ label, value }) in passivityTriggerOnTypeDatas"
                                 :value="value">
                            {{ label }}
                        </a-radio>
                    </a-radio-group>
                </a-form-item>


                <a-form-item label="是否组合技能" :label-col="{ span: 6 }">
                    <a-switch v-model:checked="formData.isCombine" checked-children="是" un-checked-children="否" :unCheckedValue="0"
                              :checkedValue="1" />
                </a-form-item>

                <a-form-item v-if="formData.isCombine" label="组合技能出招顺序" :label-col="{ span: 6 }">
                    <a-radio-group v-model:value="formData.combineSkOrder">
                        <a-radio v-for="({ label, value }) in combineSkOrderDatas" :value="value">
                            {{ label }}
                        </a-radio>
                    </a-radio-group>
                </a-form-item>

            </a-form>
        </a-modal>

    </div>

</template>
    
<script setup lang='ts'>
import { ISkillForm } from '@/interface/skillTypes';
import { onMounted, ref, computed, watchEffect } from 'vue';
import { passivityTriggerOnTypeDatas, combineSkOrderDatas } from '@/config/skillConfig';
import AreaServer from '@/components/AreaServer/index.vue';
import { saveSkill, getSkillById } from '@/api/skillApi';
import { message } from 'ant-design-vue';


const { title, tid } = defineProps({
    title: {
        type: String,
        default: '新增技能'
    },

    tid: {
        type: String,
        default: ''
    }

})
const emit = defineEmits(['close-Edit-skill', 'on-ok']);
onMounted(() => { visible.value = true; })

const confirmLoading = ref(false);

const formData = ref<ISkillForm>({
    isCombine: 0,
    passivity: 0
});

watchEffect(async () => {
    if (!tid) return;
    const { data } = await getSkillById(tid);
    formData.value = data;
});

// 控制弹出层显示
const visible = ref(false);

// 点击保存
const handleOk = async () => {
    const { data } = await saveSkill(formData.value, confirmLoading);
    visible.value = false;
    message.success(data)
    emit('on-ok');
}

</script>
