<template>
    <div class="edit-partner-container">
        <a-modal v-model:visible="visible" :title="title" @ok="visible = false"
                 okText="保存"
                 cancel-text="取消" width="100%"
                 wrap-class-name="full-modal">
            <a-form>
                <a-row>
                    <a-col :span="6">
                        <a-form-item label="伙伴名称" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="血量" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="最大血量" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="能量" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :span="6">
                        <a-form-item label="最大能量" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="修为" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="等级" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="攻击力" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :span="6">
                        <a-form-item label="物防" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="法防" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="命中" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="闪避" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :span="6">
                        <a-form-item label="暴击" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="抗暴" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="品质" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="进阶" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :span="6">
                        <a-form-item label="职业" :label-col="{ span: 5 }">
                            <a-select placeholder="请选择">
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
                    <a-col :span="6">
                        <a-form-item label="种族" :label-col="{ span: 5 }">
                            <a-select placeholder="请选择">
                                <a-select-option v-for="({ value, text }, index) in [
                                    { value: '1', text: '种族1' },
                                    { value: '2', text: '种族2' },
                                ]"
                                                 :value="value"
                                                 :key="index">
                                    {{ text }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="飞身" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="轮回" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :span="6">
                        <a-form-item label="升星" :label-col="{ span: 5 }">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="所在区" :label-col="{ span: 5 }">
                            <a-select placeholder="请选择区服">
                                <a-select-option v-for="({ value, text }, index) in [
                                    { value: '1', text: '一区' },
                                    { value: '2', text: '二区' },
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
                    <a-col :span="24">
                        <a-form-item label="伙伴技能">
                            <PartnerSkill></PartnerSkill>
                        </a-form-item>

                    </a-col>
                </a-row>
            </a-form>
        </a-modal>

    </div>
</template>
    
<script setup lang='ts'>
import { ref } from 'vue';
import PartnerSkill from './PartnerSkill.vue';

defineProps({
    title: {
        type: String,
        default: "新增伙伴"
    }
});
const visible = ref(false);

defineExpose({
    visible: visible
})



</script>
    
<style lang="scss">
.full-modal {
    .ant-modal {
        max-width: 100%;
        top: 0;
        padding-bottom: 0;
        margin: 0;
    }

    .ant-modal-content {
        display: flex;
        flex-direction: column;
        height: calc(100vh);

    }

    .ant-modal-body {
        flex: 1;
        overflow: auto;
    }
}
</style>