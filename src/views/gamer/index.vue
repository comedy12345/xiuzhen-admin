<!--
 * @Description: 玩家管理
 * @Author: ljf
 * @Date: 2022-08-11 09:16:46
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-09 17:02:05
-->
<template>
    <div class="gamer-container">
        <div class="operation">
            <a-space :size="10">
                <span class="custom-label">所在区：</span>
                <div class="select">
                    <AreaServer v-model:value="queryAreaGamer">
                    </AreaServer>
                </div>
                <a-button type="primary" @click="handlerQuery">查询</a-button>
                <a-button type="primary" @click="handerReset">重置</a-button>
            </a-space>


        </div>
        <div class="table-box">
            <a-table :dataSource="tableData?.records" rowKey="tid" :columns="columns().filter(item=>{
                if(item.key==='userName'){
                    item.title='玩家账号'
                }
                return item.key!=='type'
            })"
                     size="small" bordered :pagination="pagination" :loading="tableLodaing">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'action'">
                        <a-button type="text" style="color: #1890FF;" @click="handlerQueryGamerPartner(record.tid!)">
                            查看用户伙伴
                        </a-button>
                        <a-button type="text" style="color: #1890FF;">
                            重设密码
                        </a-button>
                        <a-switch v-model:checked="record['state']" checked-children="正常" un-checked-children="冻结" />
                    </template>
                </template>
                <template #customFilterDropdown="props">
                    <div v-if="['userName', 'phone'].some(key => key === props.column.key)"
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
                    <div v-else-if="['state'].some(key => key === props.column.key)"
                         class="skill-query-box">
                        <a-radio-group :value="props.selectedKeys[0]" @change="(e: RadioChangeEvent) => props.setSelectedKeys(e.target.value||e.target.value===0 ? [e.target.value] : [])">
                            <a-radio :value="0">正常</a-radio>
                            <a-radio :value="1">冻结</a-radio>
                        </a-radio-group>
                        <QueryFooter :filter-dropdown-props="props"
                                     @handle-reset="(e) => handleReset(e)"
                                     @handle-search="(e) => handleSearch(e)">
                        </QueryFooter>
                    </div>
                </template>
            </a-table>
        </div>

        <UserPartner ref="userPartnerRef" :currentUserTid="currentUserTid"></UserPartner>
    </div>
</template>
    
<script setup lang='ts'>
import UserPartner from './components/UserPartner.vue'
import { columns } from '@/config/userConfig';
import { ref } from 'vue';
import useCommons from '@/hooks/commons';
import { queryGamerList } from '@/api/userApi'
import { IUserForm, IUserList } from '@/interface/userType';
import useGeneralQuery from "@/hooks/generalQuery";
import { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface';
import { message } from 'ant-design-vue';
import { RadioChangeEvent } from 'ant-design-vue/es/radio/interface';

const tableLodaing = ref(false);
const getList = async () => {
    const { data } = await queryGamerList(queryParameter, tableLodaing);
    tableData.value = data;
}

// 通用表格操作
const {
    queryParameter,
    tableData,
    pagination,
} = useCommons<IUserList, IUserForm>(getList);
// 使用通用查询
const { handleSearch, handleReset } = useGeneralQuery(queryParameter, getList);

const handerReset = () => {
    queryParameter.columns = [];
    getList();
}

const queryAreaGamer = ref();
const handlerQuery = () => {
    if (!queryAreaGamer.value) return message.warn('请选择所在区');
    const domain = queryParameter.columns?.find(item => item.name === 'domain');
    if (domain) domain.value = queryAreaGamer.value;
    else queryParameter.columns?.push({ func: 'like', name: 'domain', value: queryAreaGamer.value });
    getList();
}
const userPartnerRef = ref<InstanceType<typeof UserPartner> | null>(null);
const currentUserTid = ref<number | undefined>(undefined);
const handlerQueryGamerPartner = (tid: number) => {
    userPartnerRef.value!.visible = true;
    currentUserTid.value = tid;
}
</script>
    
<style lang="scss" scoped>
.gamer-container {
    .operation {
        background-color: white;
        padding: 10px 20px;
        border-radius: 8px;
        display: flex;
        margin-bottom: 10px;

        .custom-label {
            font-weight: 500;
        }

        .select {
            width: 250px;
        }
    }

    .table-box {
        padding: 20px;
        background-color: white;
        border-radius: 8px;
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