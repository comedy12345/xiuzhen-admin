<!--
 * @Description: 伙伴信息管理
 * @Author: ljf
 * @Date: 2022-08-11 09:16:46
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-14 15:09:37
-->
<template>
    <div class="partner-container">
        <HeaderOperation @add="handlerAdd"></HeaderOperation>
        <div class="table-box">
            <a-table :loading="tableLoading" :dataSource="tableData?.records" rowKey="tid"
                     :columns="columns"
                     size="small" bordered :pagination="pagination" :scroll="{ x: 1240, y: 400 }"
                     @change="handleTableChange">
                <template #customFilterDropdown="props">
                    <div v-if="['sid', 'partnerName'].some(key => key === props.column.key)"
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
                            <a-button type="text" style="color: #1890FF;"
                                      @click="handlerEdit(record)">
                                编辑
                            </a-button>
                            <a-popconfirm placement="leftTop" title="确定要删除这个伙伴?" ok-text="删除"
                                          cancel-text="取消" @confirm="handlerDelete(record.tid!)">
                                <a-button type='text' style='color: red;'>
                                    删除
                                </a-button>
                            </a-popconfirm>
                        </div>
                    </template>
                </template>
            </a-table>
        </div>
        <EditPartner ref="editRef" :editFormData="currentEditData" @ok="handlerOk"
                     @cancel="handlerCancel">
        </EditPartner>
        <ChoiceSkill v-if="showChoiceSkill" ref="choiceSkillRef" :is-single-point="true"
                     :partner="currentPartner">
        </ChoiceSkill>
    </div>
</template>
    
<script setup lang='ts'>
import HeaderOperation from './components/HeaderOperation.vue';
import EditPartner from './components/EditPartner.vue';
import { columns } from '@/config/partnerConfig';
import { deletePartner, queryPartners } from '@/api/partnerApi';
import { IPartnerForm, IPartnerList } from '@/interface/partnerType';
import { message } from 'ant-design-vue';
import useCommons from "@/hooks/commons";
import useGeneralQuery from "@/hooks/generalQuery";
import { ChangeEvent } from 'ant-design-vue/lib/_util/EventInterface';
import AreaServer from "@/components/AreaServer/index.vue";
import ChoiceSkill from '@/components/ChoiceSkill/index.vue';
import useGetEnum from "@/hooks/getEnum";
import { nextTick, ref } from 'vue';
import { SelectValue } from 'ant-design-vue/lib/select';

const getPartnerList = async () => {
    const { data } = await queryPartners(queryParameter, tableLoading);
    tableData.value = data;
}

const {
    queryParameter,
    pagination,
    tableData,
    tableLoading,
    editRef,
    currentEditData,
    handlerAdd,
    handlerEdit,
    handleTableChange,
    handlerOk,
    handlerCancel
} = useCommons<IPartnerList, IPartnerForm>(getPartnerList);

// 使用通用查询
const { handleSearch, handleReset } = useGeneralQuery(queryParameter);

const choiceSkillRef = ref<InstanceType<typeof ChoiceSkill> | null>(null)
const showChoiceSkill = ref(false);
const currentPartner = ref<IPartnerList>({});
const partnerSkill = (partner: IPartnerList) => {
    currentPartner.value = partner;
    showChoiceSkill.value = true;
    nextTick(() => {
        choiceSkillRef.value!.showList = true;
    })

}

const handlerDelete = async (tid: string) => {
    const { data } = await deletePartner(tid);
    message.success(data);
    getPartnerList();
}

// 使用buf枚举下拉框
const { isShowFilter, getEnumByKey, filterOption } = useGetEnum();
</script>
    
<style lang="scss" scoped>
.partner-container {
    min-width: 1240px;
    margin: 0 auto;
    .table-box {
        padding: 20px;
        background-color: white;
        border-radius: 8px;
    }

    :deep(.ant-table-wrapper) {
        .action {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            .ant-btn {
                padding: 5px;
            }
        }
    }
}

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