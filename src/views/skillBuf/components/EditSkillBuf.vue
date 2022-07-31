<template>
    <div class="edit-skill-container">
        <a-modal v-model:visible="visible" :title="title" @ok="handleOk"
                 :afterClose="() => emit('close-Edit')" okText="保存"
                 cancel-text="取消" width="60%">
            <a-form>

                <a-row justify="center">
                    <a-col span="12">
                        <a-form-item label="技能特性" :label-col="{ span: 8 }">
                            <a-select v-model:value="formData.buf_type"
                                      :options="[{ label: '发攻', value: '1' }, { label: '物攻', value: '12' }]" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item label="触发几率" :label-col="{ span: 8 }">
                            <a-input v-model:value="formData.trigger_odds" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row justify="center">
                    <a-col span="12">
                        <a-form-item label="执行结果" :label-col="{ span: 8 }">
                            <a-select v-model:value="formData.result_type"
                                      :options="[{ label: '直接输出', value: '1' }, { label: '技能绑定', value: '12' }, { label: '几率变化', value: '12' }]" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item label="技能特性" :label-col="{ span: 8 }">
                            <a-select v-model:value="formData.ref_target"
                                      :options="[{ label: '攻击', value: '1' }, { label: '暴击', value: '12' }]" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row justify="center">
                    <a-col span="12">
                        <a-form-item label="变化类型" :label-col="{ span: 8 }">
                            <a-select v-model:value="formData.change_type"
                                      :options="[{ label: '增加', value: '1' }, { label: '减少', value: '12' }]" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item label="变化值" :label-col="{ span: 8 }">
                            <a-input v-model:value="formData.change_val" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row justify="center">
                    <a-col span="12">

                        <a-form-item label="变化值变化类型" :label-col="{ span: 8 }">
                            <a-select v-model:value="formData.change_val_type"
                                      :options="[{ label: '百分比', value: '1' }, { label: '直接量', value: '12' }, { label: '没有', value: '12' }]" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item label="作用范围" :label-col="{ span: 8 }">
                            <a-select v-model:value="formData.find_domain"
                                      :options="[
                                          { label: '敌方所有', value: '1' },
                                          { label: '我自己', value: '12' },
                                          { label: '相同占位', value: '12' }
                                      ]" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row justify="center">
                    <a-col span="12">
                        <a-form-item label="作用时属性检测" :label-col="{ span: 8 }">
                            <a-select v-model:value="formData.find_prop"
                                      :options="[
                                          { label: '直接触发', value: '1' },
                                          { label: '血量最低', value: '12' },
                                      
                                      ]" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item label="作用时最小数量" :label-col="{ span: 8 }">
                            <a-input v-model:value="formData.find_num_min" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row justify="center">
                    <a-col span="12">
                        <a-form-item label="作用时最大数量" :label-col="{ span: 8 }">
                            <a-input v-model:value="formData.find_num_max" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item label="作用周期" :label-col="{ span: 8 }">
                            <a-input v-model:value="formData.cycle" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row justify="start">
                    <a-col span="12">
                        <a-form-item label="作用周期类型" :label-col="{ span: 8 }">
                            <a-select v-model:value="formData.find_prop"
                                      :options="[
                                          { label: '回合', value: '1' },
                                          { label: '不设置', value: '12' },
                                      
                                      ]" />
                        </a-form-item>
                    </a-col>

                </a-row>
            </a-form>
        </a-modal>
    </div>

</template>
    
<script setup lang='ts'>
import { onMounted, ref } from 'vue';


const { title } = defineProps({
    title: {
        type: String,
        default: '新增排山倒海技能buf'
    },


})
const emit = defineEmits(['close-Edit', 'on-ok']);
onMounted(() => { visible.value = true; })


const formData = ref({

    domain_tid: '一区',
    skill_sid: '排山倒海',
    buf_type: '物攻',
    trigger_odds: '100.00',
    result_type: '1111',
    ref_target: '暴击',
    change_type: '增加',
    change_val: '1000',
    change_val_type: '百分比',
    find_domain: '敌方所有人',
    find_prop: '直接触发',
    find_num_min: '1',
    find_num_max: '100',
    cycle: '1',
    cycle_type: '回合'

})

// 控制弹出层显示
const visible = ref(false);

// 点击保存
const handleOk = () => {
    visible.value = false;
    emit('on-ok', formData.value);
}



</script>
    

<style lang="scss" >
</style>