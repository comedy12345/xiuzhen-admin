<script lang="tsx">
import { IGameServicesList } from "@/interface/gameServicesTypes";
import { Table, Button, Popconfirm, RadioGroup, Radio, Input } from "ant-design-vue";
import { defineComponent, toRefs } from "vue";
import { status } from "@/config/gameServicesConfig";
import { FilterDropdownProps, TablePaginationConfig } from "ant-design-vue/es/table/interface";
import QueryFooter from '@/components/QueryFooter/index.vue';
import useGameServicesTable from "../hooks/GameServicesTableHook";
import EditGameServices from './EditGameServices.vue';
import HeadActions from "./HeadActions.vue";
import { columns } from '@/config/gameServicesConfig';
import { computed } from "@vue/reactivity";
import { ColumnType } from "ant-design-vue/lib/table";
import { cloneDeep } from 'lodash';
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

    setup(props, context) {

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

        const filterColumns: any = computed(() => {
            if (!isChildren.value) {
                return cloneDeep(columns).map((item: { key: string; title: string; }) => {
                    if (item.key === 'serverName') {
                        item.title = '服务器'
                    }
                    return item;
                });
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
                switch (record.stat) {
                    case 0:
                        return <><a-badge status="error" />{status[record.stat!] && status[record.stat!].text}</>
                    case 1:
                        return <><a-badge status="success" />{status[record.stat!] && status[record.stat!].text}</>
                    case 2:
                        return <><a-badge status="processing" />{status[record.stat!] && status[record.stat!].text}</>
                    case 3:
                        return <><a-badge status="default" />{status[record.stat!] && status[record.stat!].text}</>
                    default:
                        break;
                }
            }
            return <>{record[key]}</>
        }


        // 自定义筛选footer
        const customQueryFooter = (props: FilterDropdownProps<ColumnType>): JSX.Element => {
            return (
                <>
                    <QueryFooter
                        filterDropdownProps={props}
                        onHandleSearch={(e) => handleSearch(e)}
                        onHandleReset={(e) => handleReset(e)}
                    >
                    </QueryFooter>
                </>
            )
        }

        // 自定义筛选条件
        const columnQueryBox = (props: FilterDropdownProps<ColumnType>): JSX.Element => {
            const { setSelectedKeys, selectedKeys, column } = props;
            if (column.key === 'stat') {
                return (
                    <div style="padding: 12px;width: 300px;text-align: center;">
                        <RadioGroup value={selectedKeys[0]} onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}>
                            <Radio value={0} >关闭</Radio>
                            <Radio value={1} >开启</Radio>
                            <Radio value={2} >更新</Radio>
                            <Radio value={3} >维护</Radio>
                        </RadioGroup>
                        {customQueryFooter(props)}
                    </div>
                )
            }
            return (
                <div style="padding: 12px">
                    <Input placeholder={`查询${column.title}`} value={selectedKeys[0]} style="width: 188px; margin-bottom: 8px; display: block" onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}></Input>
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

    .action {
        display: flex;
        justify-content: space-around;
    }
}
</style>