<template>
    <div class="edit-partner-container">
        <a-modal v-model:visible="visible" :title="partnerFormData.tid ? '编辑伙伴' : '新增伙伴'"
                 okText="保存" cancel-text="取消" width="80%"
                 :confirm-loading="confirmLoading"
                 @ok="handlerOk" @cancel="handlerCancel">
            <a-form ref="partnerFormRef" :model="partnerFormData">
                <a-row>
                    <a-col :span="6">
                        <a-form-item label="伙伴名称" :label-col="{ span: 5 }" name="partnerName">
                            <a-input v-model:value="partnerFormData.partnerName" placeholder="请输入伙伴名称"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="固定值" :label-col="{ span: 5 }" name="sid">
                            <a-input v-model:value="partnerFormData.sid" placeholder="请输入固定值"></a-input>
                        </a-form-item>
                    </a-col>

                    <a-col :span="6">
                        <a-form-item label="所在区" :label-col="{ span: 5 }" name="domainId">
                            <AreaServer v-model:value="partnerFormData.domainId"></AreaServer>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="职业" :label-col="{ span: 5 }" name="job">
                            <a-select v-model:value="partnerFormData.job" placeholder="请选择">
                                <a-select-option v-for="({ value, text }, index) in [
                                    { value: '1', text: '职业1' },
                                    { value: '2', text: '职业2' },
                                ]"
                                                 :value="value"
                                                 :key="index">
                                    {{ text }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                </a-row>
                <a-row>
                    <a-col :span="6">
                        <a-form-item label="升星" :label-col="{ span: 5 }" name="star">
                            <a-input v-model:value="partnerFormData.star" placeholder="请输入升星"></a-input>
                        </a-form-item>
                    </a-col>

                    <a-col :span="6">
                        <a-form-item label="血量" :label-col="{ span: 5 }" name="blood">
                            <a-input v-model:value="partnerFormData.blood" placeholder="请输入血量"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="最大血量" :label-col="{ span: 5 }" name="maxBlood">
                            <a-input v-model:value="partnerFormData.maxBlood" placeholder="请输入最大血量"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="能量" :label-col="{ span: 5 }">
                            <a-input v-model:value="partnerFormData.power" placeholder="请输入能量"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :span="6">
                        <a-form-item label="最大能量" :label-col="{ span: 5 }" name="maxPower">
                            <a-input v-model:value="partnerFormData.maxPower" placeholder="请输入能量"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="修为" :label-col="{ span: 5 }" name="exp">
                            <a-input v-model:value="partnerFormData.exp" placeholder="请输入修为"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="等级" :label-col="{ span: 5 }" name="lev">
                            <a-input v-model:value="partnerFormData.lev" placeholder="请输入等级"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="攻击力" :label-col="{ span: 5 }" name="attack">
                            <a-input v-model:value="partnerFormData.attack" placeholder="请输入攻击力"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :span="6">
                        <a-form-item label="物防" :label-col="{ span: 5 }" name="pdef">
                            <a-input v-model:value="partnerFormData.pdef" placeholder="请输入物防"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="法防" :label-col="{ span: 5 }" name="mdef">
                            <a-input v-model:value="partnerFormData.mdef" placeholder="请输入物防"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="命中" :label-col="{ span: 5 }" name="hit">
                            <a-input v-model:value="partnerFormData.hit" placeholder="请输入命中"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="闪避" :label-col="{ span: 5 }" name="dodge">
                            <a-input v-model:value="partnerFormData.dodge" placeholder="请输入闪避"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :span="6">
                        <a-form-item label="暴击" :label-col="{ span: 5 }" name="crit">
                            <a-input v-model:value="partnerFormData.crit" placeholder="请输入暴击"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="抗暴" :label-col="{ span: 5 }" name="revolt">
                            <a-input v-model:value="partnerFormData.revolt" placeholder="请输入抗暴"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="品质" :label-col="{ span: 5 }" name="quality">
                            <a-input v-model:value="partnerFormData.quality" placeholder="请输入品质"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="进阶" :label-col="{ span: 5 }" name="steps">
                            <a-input v-model:value="partnerFormData.steps" placeholder="请输入进阶"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :span="6">
                        <a-form-item label="种族" :label-col="{ span: 5 }" name="race">
                            <a-select v-model:value="partnerFormData.race" placeholder="请选择">
                                <a-select-option v-for="({ value, text }, index) in [{ value: '1', text: '种族1' }, { value: '2', text: '种族2' }]"
                                                 :value="value"
                                                 :key="index">
                                    {{ text }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="飞升" :label-col="{ span: 5 }" name="fly">
                            <a-input v-model:value="partnerFormData.fly" placeholder="请输入飞升"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="轮回" :label-col="{ span: 5 }" name="lifeBack">
                            <a-input v-model:value="partnerFormData.lifeBack" placeholder="请输入轮回"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="伙伴介绍" :label-col="{ span: 5 }" name="introduce">
                            <a-textarea v-model:value="partnerFormData.introduce" placeholder="请输入伙伴介绍" auto-size />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>

    </div>
</template>
    
<script setup lang='ts'>
import { ref, toRefs, watchEffect } from 'vue';
import AreaServer from "@/components/AreaServer/index.vue";
import { IPartnerForm } from '@/interface/partnerType';
import { savePartner } from '@/api/partnerApi';
import { message, FormInstance } from 'ant-design-vue';

const props = defineProps({
    editFormData: {
        type: Object as () => IPartnerForm,
        default: undefined
    }
});

const { editFormData } = toRefs(props);
const emit = defineEmits(['ok', 'cancel']);
const partnerFormRef = ref<FormInstance | null>(null);
const visible = ref(false);
const partnerFormData = ref<IPartnerForm>({});

watchEffect(() => {
    partnerFormData.value = { ...editFormData!.value };
})

const confirmLoading = ref(false);
// 保存伙伴
const handlerOk = async () => {
    const { data } = await savePartner(partnerFormData.value, confirmLoading);
    message.success(data);
    visible.value = false;
    emit('ok');
}

// 取消
const handlerCancel = () => {
    visible.value = false;
    emit('cancel')
}

defineExpose({
    visible
})


</script>
    
<style lang="scss">
</style>