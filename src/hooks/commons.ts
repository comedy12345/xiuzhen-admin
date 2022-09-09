import { IBaseQueryParameter, IData } from "@/interface/types";
import { TablePaginationConfig } from "ant-design-vue";
import { computed, onMounted, reactive, ref } from "vue";

/*
 * @Description: 管理模块通用操作
 * @Author: ljf
 * @Date: 2022-08-23 11:42:52
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-09 14:58:35
 */
export default function <K, V>(getList: Function) {

      // 获取编辑弹出层实例
      const editRef = ref<any>(null);

      // 当前编辑的数据
      const currentEditData = ref<V>();

      const handlerOk = () => {
            editRef.value!.visible = false;
            currentEditData.value = undefined;
            getList();
      }
      const handlerCancel = () => {
            editRef.value!.visible = false;
            currentEditData.value = undefined;
      }

      const handlerAdd = () => {
            editRef.value!.visible = true;
      }
      const handlerEdit = (record: V) => {
            editRef.value!.visible = true;
            currentEditData.value = record;
      }

      const tableData = ref<IData<K[]>>();
      const tableLoading = ref(false);

      // 分页对象
      const pagination = computed(() => ({
            total: tableData.value?.total,
            current: tableData.value?.current,
            pageSize: tableData.value?.size,
            showTotal: (total: number) => '总数 ' + total + ' 条'
      }));

      // 分页切换
      const handleTableChange = (pagination: TablePaginationConfig) => {
            queryParameter.current = pagination.current!;
            queryParameter.size = pagination.pageSize;
            getList();
      }
      // 查询参数
      const queryParameter = reactive<IBaseQueryParameter>({
            size: 10,
            current: 1,
            columns: []
      });
      onMounted(() => {
            getList();
      })
      return {
            editRef,
            currentEditData,
            tableData,
            tableLoading,
            pagination,
            queryParameter,
            handlerAdd,
            handlerEdit,
            handleTableChange,
            handlerOk,
            handlerCancel
      }
}