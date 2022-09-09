<!--
 * @Description: 用户玩家
 * @Author: ljf
 * @Date: 2022-08-11 09:16:46
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-09 16:32:43
-->
<template>
    <div class="user-partner-container">
        <a-modal v-model:visible="visible" title="用户伙伴" style="height: auto;"
                 width="60%" :footer="null" centered>

            <a-table :columns="columns" :data-source="tableData?.records" rowKey="tid"
                     :scroll="{ y: 490 }" :pagination="pagination">
                <template #customFilterDropdown="props">
                    <div v-if="['tid', 'partnerName'].some(key => key === props.column.key)"
                         class="skill-query-box">
                        <a-input :placeholder="props.column.title"
                                 :value="props.selectedKeys[0]"
                                 @change="(e: ChangeEvent) => props.setSelectedKeys(e.target.value ? [e.target.value] : [])">
                        </a-input>
                        <QueryFooter :filter-dropdown-props="props"
                                     @handle-reset="(e) => handleReset(e)"
                                     @handle-search="(e) => handleSearch(e)">
                        </QueryFooter>
                    </div>
                    <div v-else-if="props.column.key === 'domainId'" class="skill-query-box">
                        <AreaServer :value="props.selectedKeys[0]"
                                    @update:value="value => props.setSelectedKeys(value ? [value] : [])">
                        </AreaServer>
                        <QueryFooter :filter-dropdown-props="props"
                                     @handle-reset="(e) => handleReset(e)"
                                     @handle-search="(e) => handleSearch(e)">
                        </QueryFooter>
                    </div>
                    <div v-else-if="isShowFilter(props.column.key)" class="skill-query-box">
                        <a-select style="width: 120px;"
                                  show-search
                                  :value="props.selectedKeys[0]"
                                  :options="getEnumByKey(props.column.key)"
                                  :placeholder="props.column.title"
                                  :filter-option="filterOption"
                                  @change="(value: SelectValue) => props.setSelectedKeys(value || value === 0 ? [value] : [])" />
                        <QueryFooter :filter-dropdown-props="props"
                                     @handle-reset="(e) => handleReset(e)"
                                     @handle-search="(e) => handleSearch(e)">
                        </QueryFooter>
                    </div>
                </template>
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'action'">
                        <div class="action">
                            <a-button type="text" style="color: #1890FF;"
                                      @click="partnerSkill(record)">
                                伙伴技能
                            </a-button>
                        </div>
                    </template></template>
                <template #expandedRowRender="{ record }">
                    <a-descriptions title="伙伴数据详情" bordered
                                    :labelStyle="{ backgroundColor: '#d8d8d8' }" size="small">
                        <a-descriptions-item label="伙伴名称">{{record['partnerName']}}</a-descriptions-item>
                        <a-descriptions-item label="所在区">{{record['domainId']}}</a-descriptions-item>
                        <a-descriptions-item label="职业">{{record['job']}}</a-descriptions-item>
                        <a-descriptions-item label="是否主伙伴">{{record['isMasterPartner']}}</a-descriptions-item>
                        <a-descriptions-item label="是否上阵">{{record['isPlayed']}}</a-descriptions-item>
                        <a-descriptions-item label="等级">{{record['lev']}}</a-descriptions-item>
                        <a-descriptions-item label="血量">{{record['blood']}} </a-descriptions-item>
                        <a-descriptions-item label="最大血量">{{record['maxBlood']}}</a-descriptions-item>
                        <a-descriptions-item label="能量">{{record['power']}}</a-descriptions-item>
                        <a-descriptions-item label="最大能量">{{record['maxPower']}}</a-descriptions-item>
                        <a-descriptions-item label="修为">{{record['exp']}}</a-descriptions-item>
                        <a-descriptions-item label="攻击力">{{record['attack']}}</a-descriptions-item>
                        <a-descriptions-item label="物防">{{record['pdef']}}</a-descriptions-item>
                        <a-descriptions-item label="法防">{{record['mdef']}}</a-descriptions-item>
                        <a-descriptions-item label="命中率">{{record['hit']}}</a-descriptions-item>
                        <a-descriptions-item label="闪避">{{record['dodge']}}</a-descriptions-item>
                        <a-descriptions-item label="暴击">{{record['crit']}}</a-descriptions-item>
                        <a-descriptions-item label="抗暴">{{record['revolt']}}</a-descriptions-item>
                        <a-descriptions-item label="灵币">{{record['gameCurrency']}}</a-descriptions-item>
                        <a-descriptions-item label="仙缘">{{record['currency']}}</a-descriptions-item>
                        <a-descriptions-item label="灵液">{{record['pot']}}</a-descriptions-item>
                        <a-descriptions-item label="最大灵液">{{record['maxPot']}}</a-descriptions-item>
                        <a-descriptions-item label="品质">{{record['quality']}}</a-descriptions-item>
                        <a-descriptions-item label="进阶">{{record['steps']}}</a-descriptions-item>
                        <a-descriptions-item label="种族">{{record['race']}}</a-descriptions-item>
                        <a-descriptions-item label="飞升">{{record['fly']}}</a-descriptions-item>
                        <a-descriptions-item label="轮回">{{record['lifeBack']}}</a-descriptions-item>
                        <a-descriptions-item label="升星">{{record['star']}}</a-descriptions-item>

                    </a-descriptions>
                </template>
            </a-table>
        </a-modal>
        <ChoiceSkill v-if="showChoiceSkill" ref="choiceSkillRef" :is-single-point="true" :detail="false"
                     :partner="currentPartner">
        </ChoiceSkill>
    </div>
</template>
    
<script setup lang='ts'>
import { nextTick, ref, toRefs, watch } from 'vue';
import { columns } from "@/config/userPartnerConfig";
import useCommons from '@/hooks/commons';
import { queryGamerPartners } from '@/api/partnerApi';
import { IGamerPartnerList } from "@/interface/partnerType";
// import useQueryParameter from '@/hooks/queryParameter';
import { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface';
import useGeneralQuery from "@/hooks/generalQuery";
import useGetEnum from "@/hooks/getEnum";
import { SelectValue } from 'ant-design-vue/es/select';
import ChoiceSkill from '@/components/ChoiceSkill/index.vue';
import { IPartnerList } from '@/interface/partnerType';


const props = defineProps({
    currentUserTid: {
        type: Number,
        default: undefined

    }
});
const { currentUserTid } = toRefs(props);

const tableLodaing = ref(false);

const getList = async () => {
    const { data } = await queryGamerPartners(queryParameter, tableLodaing);
    tableData.value = data;
}

// 通用表格操作
const {
    queryParameter,
    tableData,
    pagination,
} = useCommons<IGamerPartnerList, undefined>(getList);

// // 收集并封装查询表单
// const { queryForm, queryParameterColumn } = useQueryParameter();

// 使用通用查询
const { handleSearch, handleReset } = useGeneralQuery(queryParameter, getList);

// 使用buf枚举下拉框
const { isShowFilter, getEnumByKey, filterOption } = useGetEnum();

// // 表字段以外查询
// const handlerQuery = () => {
//     queryParameterColumn.value.forEach(item => {
//         const findColumn = queryParameter.columns?.find(v => v.name === item.name);
//         if (findColumn) {
//             findColumn.value = item.value;
//         } else {
//             queryParameter.columns?.push(item);
//         }
//     })
//     getList();
// }
// // 重置
// const handlerReset=()=>{
//     queryParameter.columns=[{ func: 'like', name: 'userTid', value: currentUserTid!.value }];
//     Object.keys(queryForm).forEach(item=>{
//         delete queryForm[item];
//     })
//     getList();
// }
const choiceSkillRef = ref<InstanceType<typeof ChoiceSkill> | null>(null)
const showChoiceSkill = ref(false);
const currentPartner = ref<IPartnerList>({})
const partnerSkill = (partner: IPartnerList) => {
    currentPartner.value = partner;
    showChoiceSkill.value = true;
    nextTick(() => {
        choiceSkillRef.value!.showList = true;
    })

}

watch(() => currentUserTid!.value, () => {
    const userTid = queryParameter.columns?.find(item => item.name === 'userTid');
    if (userTid) userTid.value = currentUserTid!.value;
    else queryParameter.columns?.push({ func: 'like', name: 'userTid', value: currentUserTid!.value });
    getList();
})

const visible = ref(false);
defineExpose({
    visible: visible
})



</script>
    
<style lang="scss" scoped>
.user-partner-container {}

.ant-table-filter-dropdown {
    .skill-query-box {
        display: flex;
        flex-direction: column;
        padding: 10px;
        justify-content: space-between;
        height: 80px;
        align-items: center;
    }
}
</style>