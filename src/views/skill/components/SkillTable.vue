<template>
    <div class="skill-table-container">
        <a-table :dataSource="dataSource" rowKey="tid" :columns="columns" @expand="handlerExpand"
                 :indentSize="40" size="small" bordered>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-button type="text" style="color: #1890FF;" @click="router.push(`/skillBuf/${record.tid}`)">
                        技能buf管理
                    </a-button>
                    <a-button v-if="record.is_combine" type="text" style="color: #1890FF;"
                              @click="handlerAddSkill">
                        添加子技能
                    </a-button>
                    <a-button type="text" style="color: #1890FF;">编辑</a-button>
                    <a-button type="text" style="color: red;">删除</a-button>
                </template>
                <template v-if="column.key === 'is_combine'">
                    {{ record[column.key] ? '是' : '否' }}
                </template>
            </template>
        </a-table>
        <EditSkill v-if="showEditSkill" @close-edit-skill="showEditSkill = false" :editType="0"></EditSkill>
    </div>
</template>
    
<script setup lang='ts'>
import { ColumnsType } from 'ant-design-vue/es/table/Table';
import { ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import EditSkill from '../components/EditSkill.vue';
const router = useRouter();
const props = defineProps({
    columns: {
        type: Object as () => ColumnsType,
        required: true
    },
    dataSource: {
        type: Object as any,
        required: true
    }
});
const { columns, dataSource } = toRefs(props);
const showEditSkill = ref(false);
const handlerAddSkill = () => {
    showEditSkill.value = true;
}
const handlerExpand = (expanded: boolean, record: any) => {
    console.log(record)
    record.children.push({
        tid: '1',
        domain_tid: '一区',
        skill_name: '排山倒海子技能',
        passivity: '是',
        passivity_trigger_on_type: '每秒触发',
        is_combine: false,
        combine_sk_ls: '111111',
        combine_sk_order: '随机出招',
        expend_prop: '消耗体力',
        expend_val: '100'
    })
}

</script>
    
<style lang="scss" scoped>
.skill-table-container {
    padding: 20px;
    background-color: white;
    border-radius: 8px;


    :deep(.ant-table-wrapper) {
        .ant-table-row-level-0 {
            color: rgb(105, 105, 105);
            font-weight: 550;
        }
    }

}
</style>