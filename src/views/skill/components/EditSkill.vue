<template>
    <div class="edit-skill-container">
        <a-modal v-model:visible="visible" :title="title" @ok="handleOk"
                 :afterClose="() => emit('close-Edit-skill')" width="70%" wrap-class-name="full-modal" okText="保存"
                 cancel-text="取消">

            <a-form>
                <a-row justify="center">
                    <a-col span="12">
                        <a-form-item label="所在区" :label-col="{ span: 6 }">
                            <a-select v-model:value="formData.domain_tid" :options="[{ label: '一区', value: '1' }]" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item label="技能名称" :label-col="{ span: 6 }">
                            <a-input v-model:value="formData.skill_name" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row justify="center">
                    <a-col span="12">
                        <a-form-item label="是否被动技能" :label-col="{ span: 6 }">
                            <a-switch v-model:checked="passivityC" checked-children="是" un-checked-children="否" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item v-if="passivityC" label="被动触发特性" :label-col="{ span: 6 }">
                            <a-select v-model:value="formData.passivity_trigger_on_type"
                                      :options="[{ label: '被攻击时', value: 1 }, { label: '每回合触发', value: 2 },
                                      { label: '每秒触发', value: 3 }]" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row justify="center">
                    <a-col span="12">
                        <a-form-item label="消耗属性" :label-col="{ span: 6 }">
                            <a-select v-model:value="formData.expend_prop"
                                      :options="[{ label: '属性111', value: 1 }, { label: '属性22', value: 2 }]" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item label="消耗值" :label-col="{ span: 6 }">
                            <a-input v-model:value="formData.expend_val" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row v-if="editType" justify="center">
                    <a-col span="12">
                        <a-form-item label="是否组合技能" :label-col="{ span: 6 }">
                            <a-switch v-model:checked="is_combineC" checked-children="是" un-checked-children="否" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item v-if="is_combineC" label="组合技能出招顺序" :label-col="{ span: 6 }">
                            <a-select v-model:value="formData.combine_sk_order"
                                      :options="[{ label: '随机出招', value: 1 }, { label: '顺序出招', value: 2 }]" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>

    </div>

</template>
    
<script setup lang='ts'>
import { onMounted, ref, computed, toRefs, reactive } from 'vue';

const { title, editType } = defineProps({
    title: {
        type: String,
        default: '新增技能'
    },
    editType: {
        type: Number,
        default: 1
    },
    width: {
        type: String,
        default: '100%'
    }

})
const emit = defineEmits(['close-Edit-skill', 'on-ok']);
onMounted(() => { visible.value = true; })

// 是否被动技能
const passivityC = computed({
    get: () => formData.value.passivity === 1,
    set: (val) => {
        if (val) {
            formData.value.passivity = 1;
            return;
        }
        formData.value.passivity = 0;
    }
});
// 是否组合属性
const is_combineC = computed({
    get: () => formData.value.is_combine === 1,
    set: (val) => {
        if (val) {
            formData.value.is_combine = 1;
            return;
        }
        formData.value.is_combine = 0;
    }
});
const formData = ref({
    domain_tid: '1',
    skill_name: '',
    passivity: 1,
    passivity_trigger_on_type: 1,
    is_combine: 1,
    combine_sk_order: 1,
    expend_prop: 1,
    expend_val: ""
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