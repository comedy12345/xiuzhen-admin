<!--
 * @Description: 游戏服务表格组件
 * @Author: ljf
 * @Date: 2022-08-11 09:16:46
 * @LastEditors: ljf
 * @LastEditTime: 2022-08-11 13:52:15
-->

<script lang="tsx">
import { IGameServicesList } from "@/interface/gameServicesTypes";
import { FilterDropdownProps, TablePaginationConfig, ColumnType } from "ant-design-vue/es/table/interface";
import { Table, Button, Popconfirm, RadioGroup, Input, RadioButton, Badge, Space } from "ant-design-vue";
import QueryFooter from '@/components/QueryFooter/index.vue';
import EditGameServices from './EditGameServices.vue';
import HeadActions from "./HeadActions.vue";
import useGameServicesTable from "../hooks/GameServicesTableHook";
import { defineComponent, toRefs, computed } from "vue";
import { cloneDeep } from 'lodash';
import { status } from "@/config/gameServicesConfig";
import { columns } from '@/config/gameServicesConfig';
type tableScope = { column: ColumnType<any>, record: IGameServicesList };
const GameServicesTable = defineComponent({
    props: {
        isChildren: {
            type: Boolean,
            default: false
        },
        parentTid: {
            type: String,
            default: ''
        }
    },

    setup(props) {
        const { isChildren, parentTid } = toRefs(props);
        const {
            tableData,
            loading,
            pagination,
            editGameService,
            editGameServicesRef,
            handleSearch,
            handleReset,
            handleTableChange,
            editHandle,
            deleteHandle,
            getList
        } = useGameServicesTable(parentTid.value);

        // 过滤table字段
        const filterColumns = computed(() => {
            if (!isChildren.value) {
                return (cloneDeep(columns).map((item: { key: string; title: string; }) => {
                    if (item.key === 'serverName') {
                        item.title = '服务器'
                    }
                    return item;
                }) as ColumnType<any>[]).filter(item => item.key !== 'parentTid');
            }
            else return columns;
        })

        // 表格数据操作
        const actionBox = (scope: tableScope): JSX.Element => {
            const { column, record } = scope;
            const key = column.key as string;
            if (column.key === 'action') {
                return (

                    <div class='action'>
                        <Button type='text' style='color: #1890FF;' onClick={() => editHandle(record)}>
                            编辑
                        </Button>
                        <Popconfirm placement="leftTop" title="确定要删除这个游戏服务/区服?" ok-text="删除"
                            cancel-text="取消" onConfirm={() => deleteHandle(record.tid!)}>
                            <Button type='text' style='color: red;'>
                                删除
                            </Button>
                        </Popconfirm>
                    </div>

                )
            } else if (column.key === 'stat') {
                const statusObj = status[record.stat!];
                if (statusObj) return <><a-badge status={statusObj.badgeStatus} />{statusObj.text}</>
            }
            return <>{record[key]}</>
        }


        // 自定义筛选footer
        const customQueryFooter = (props: FilterDropdownProps<ColumnType>): JSX.Element => {
            return <QueryFooter filterDropdownProps={props} onHandleSearch={(e) => handleSearch(e)} onHandleReset={(e) => handleReset(e)} />;
        }

        // 自定义筛选条件
        const columnQueryBox = (props: FilterDropdownProps<ColumnType>): JSX.Element => {
            const { setSelectedKeys, selectedKeys, column } = props;
            if (column.key === 'stat') {
                return (
                    <div class='custom-query-box'>
                        <RadioGroup value={selectedKeys[0]} onChange={e => setSelectedKeys(e.target.value || e.target.value == 0 ? [e.target.value] : [])} size='small'>
                            <Space size={10}>
                                {status.map(({ value, text, badgeStatus }) => {
                                    return <RadioButton value={value}><Badge status={badgeStatus}></Badge>{text}</RadioButton>
                                })}
                            </Space>
                        </RadioGroup>
                        {customQueryFooter(props)}
                    </div>
                )
            }
            return (
                <div class='custom-query-box'>
                    <Input placeholder={`查询${column.title}`} value={selectedKeys[0]} onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}></Input>
                    {customQueryFooter(props)}
                </div>
            )
        }

        // 编辑弹出层
        const editGameServicesBox = () => {
            return (
                <EditGameServices
                    ref={editGameServicesRef}
                    editGameService={editGameService.value}
                    type="update"
                    onRefreshTable={() => getList()} >
                </EditGameServices>
            )
        }
        // 子表格（区）
        const childrenTable = (obj: any) => {
            return <GameServicesTable isChildren={true} parentTid={obj.record.tid}></GameServicesTable>
        }

        // table插槽
        const childrenSlot = {
            bodyCell: (scope: tableScope) => actionBox(scope),
            customFilterDropdown: (props: FilterDropdownProps<ColumnType>) => columnQueryBox(props),
        } as any
        !isChildren.value && (childrenSlot.expandedRowRender = (obj: any) => childrenTable(obj))

        return () => (
            <>
                {isChildren.value || <HeadActions onRefreshTable={() => getList()} ></HeadActions>}

                <div class="table-box">
                    <Table
                        rowKey="tid"
                        loading={loading.value}
                        columns={filterColumns.value}
                        dataSource={tableData.value?.records}
                        pagination={pagination.value}
                        bordered
                        size="small"
                        sticky={{ offsetHeader: -21 }}
                        scroll={{ x: true }}
                        onChange={(pagination: TablePaginationConfig) => handleTableChange(pagination)}
                        v-slots={childrenSlot}
                    >
                    </Table>
                    {editGameServicesBox()}
                </div>
            </>
        )
    }
})
export default GameServicesTable;
</script>
<style lang="scss" scoped>
.table-box {
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    position: relative;

    .action {
        display: flex;
        justify-content: space-around;
    }
}
</style>
<style>
.custom-query-box {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100px;
    border-radius: 8px;
}
</style>