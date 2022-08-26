<template>
    <div class="edit-skill-container">
        <a-modal class="edit-buf-modal" v-model:visible="visible" :title="title" @ok="handleOk"
                 :afterClose="() => emit('close-Edit')" okText="保存" centered
                 cancel-text="取消" width="80%">
            <a-form>
                <a-row justify="center">
                    <a-col span="12">
                        <a-form-item label="出招顺序" :label-col="{ span: 8 }">
                            <a-select v-model:value="formData.orderIdx"
                                      :options="getEnumByType(9)" placeholder="请输选择出招顺序"
                                      show-search
                                      :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item label="固定值" :label-col="{ span: 8 }">
                            <a-input v-model:value="formData.sid" placeholder="请输入固定值" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row justify="center">
                    <a-col span="12">
                        <a-form-item label="技能特性" :label-col="{ span: 8 }">
                            <a-select v-model:value="formData.bufType"
                                      :options="getEnumByType(1)" placeholder="请选技能特性"
                                      show-search
                                      :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item label="触发几率" :label-col="{ span: 8 }">
                            <a-input v-model:value="formData.triggerOdds" placeholder="请输入触发几率" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row justify="center">
                    <a-col span="12">
                        <a-form-item label="执行结果" :label-col="{ span: 8 }">
                            <a-select v-model:value="formData.resultType"
                                      :options="getEnumByType(7)" placeholder="请选择执行结果"
                                      show-search
                                      :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item label="变化类型" :label-col="{ span: 8 }">
                            <a-select v-model:value="formData.changeType"
                                      :options="getEnumByType(8)" placeholder="请选择变化类型" show-search
                                      :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row justify="center">
                    <a-col span="12">
                        <a-form-item label="变化值变化类型" :label-col="{ span: 8 }">
                            <a-select v-model:value="formData.changeValType"
                                      :options="getEnumByType(2)" placeholder="请选择变化值变化类型"
                                      show-search
                                      :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item label="变化值" :label-col="{ span: 8 }">
                            <a-input v-model:value="formData.changeVal" placeholder="请输入变化值" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row justify="center">
                    <a-col span="12">
                        <a-form-item label="作用范围" :label-col="{ span: 8 }">
                            <a-select v-model:value="formData.findDomain"
                                      :options="getEnumByType(4)" placeholder="请选择作用范围" show-search
                                      :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item label="作用时属性检测" :label-col="{ span: 8 }">
                            <a-select v-model:value="formData.findProp"
                                      :options="getEnumByType(5)" placeholder="请选择作用时属性检测"
                                      show-search
                                      :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row justify="center">
                    <a-col span="12">
                        <a-form-item label="作用时最小数量" :label-col="{ span: 8 }">
                            <a-input v-model:value="formData.findNumMin" placeholder="请输入作用时最小数量" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item label="作用时最大数量" :label-col="{ span: 8 }">
                            <a-input v-model:value="formData.findNumMax" placeholder="请输入作用时最大数量" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row justify="center">
                    <a-col span="12">
                        <a-form-item label="作用周期类型" :label-col="{ span: 8 }">
                            <a-select v-model:value="formData.cycleType"
                                      :options="getEnumByType(3)" placeholder="请选择作用周期类型"
                                      show-search
                                      :filter-option="filterOption" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item label="作用周期" :label-col="{ span: 8 }">
                            <a-input v-model:value="formData.cycle" placeholder="请输入作用周期" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row justify="start">
                    <!-- <a-col span="12">
                        <a-form-item label="所属区" :label-col="{ span: 8 }">
                            <AreaServer v-model:value="formData.domainId"></AreaServer>
                        </a-form-item>
                    </a-col> -->
                    <a-col span="12">
                        <a-form-item label="输出参考" :label-col="{ span: 8 }">
                            <a-select v-model:value="formData.refTarget"
                                      :options="getEnumByType(6)" placeholder="请选择输出参考"
                                      show-search
                                      :filter-option="filterOption" />

                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row justify="start">
                    <a-col span="24">
                        <a-form-item>
                            <ChoiceSkill v-model:saddRef="formData.saddRef" :buf-tid="formData.tid"
                                         :isModal="false">
                            </ChoiceSkill>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
    </div>

</template>
    
<script setup lang='ts'>
import { onMounted, ref, toRefs, watchEffect } from 'vue';
import { useRoute } from 'vue-router'
import { saveBuf } from "@/api/skillBufApi";
import { ISkillBufForm } from '@/interface/skillBufType';
import { message } from 'ant-design-vue';
import useGetEnum from "@/hooks/getEnum";
import ChoiceSkill from "@/components/ChoiceSkill/index.vue";
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    formDataProp: {
        type: Object as () => ISkillBufForm,
        default: {}
    }
})
const { title, formDataProp } = toRefs(props);
const emit = defineEmits(['close-Edit', 'on-ok']);
const route = useRoute();
// buf枚举下拉
const { getEnumByType, filterOption } = useGetEnum();

onMounted(() => {
    visible.value = true;

})

const formData = ref<ISkillBufForm>({
    skillSid: route.params.skillSid as string
})
watchEffect(() => {
    formData.value = { ...formDataProp.value, skillSid: route.params.skillSid as string }
})

// 控制弹出层显示
const visible = ref(false);

// 点击保存
const handleOk = async () => {
    const { data } = await saveBuf(formData.value);
    visible.value = false;
    message.success(data);
    emit('on-ok');
}



</script>
    

<style lang="scss">
.edit-buf-modal {
    .ant-modal-body {
        max-height: 80vh;
        overflow: auto;
    }
}
</style>