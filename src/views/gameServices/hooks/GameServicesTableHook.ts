import { computed, onMounted, reactive, ref } from "vue";
import { queryGameServices, deleteGameServices } from '@/api/gameServices/gameServicesApi'
import { IGameServicesForm, IGameServicesList } from "@/interface/gameServicesTypes";
import { IData } from "@/interface/types";
import { TablePaginationConfig, message } from "ant-design-vue";
import EditGameServices from './componets/EditGameServices.vue';
import { IBaseQueryParameter } from '@/interface/types';
import useGeneralQuery from '@/hooks/generalQuery';

export default function (parentTid: String) {

    let loading = ref(false);

    // 编辑框Ref
    const editGameServicesRef = ref<InstanceType<typeof EditGameServices> | null>(null);

    // 查询参数
    const queryParameter = reactive<IBaseQueryParameter>({
        size: 10,
        current: 1,
        columns: []
    });

    // 分页参数
    const pagination = computed(() => ({
        total: tableData.value?.total,
        current: tableData.value?.current,
        pageSize: tableData.value?.size,
    }));

    // 表格数据
    const tableData = ref<IData<IGameServicesList[]>>();

    // 当前编辑数据
    const editGameService = ref<IGameServicesForm>();

    // 分页事件
    const handleTableChange = (pagination: TablePaginationConfig) => {
        queryParameter.current = pagination.current!;
        getList();
    }

    // 查询
    const getList = async () => {
        const { data } = await queryGameServices(queryParameter, loading);
        tableData.value = data;
    }

    // 编辑
    const editHandle = (gameService: IGameServicesList) => {
        editGameServicesRef.value!.visible = true;
        editGameService.value = ({ ...gameService } as IGameServicesForm);
    }

    // 删除
    const deleteHandle = async (tid: number) => {
        const { data } = await deleteGameServices(tid);
        message.success(data);
        getList();
    }

    // 使用通用查询
    const { handleSearch, handleReset } = useGeneralQuery(queryParameter, getList);


    onMounted(() => {
        if (parentTid) {
            console.log(parentTid)
            queryParameter.columns?.push({ func: 'eq', name: 'parentTid', value: parentTid })
        } else {
            queryParameter.columns?.push({ func: 'eq', name: 'parentTid', value: 0 })
        }
        getList();
    })


    return {
        loading,
        editGameServicesRef,
        queryParameter,
        tableData,
        pagination,
        editGameService,
        handleTableChange,
        editHandle,
        getList,
        deleteHandle,
        handleSearch,
        handleReset
    }
}


