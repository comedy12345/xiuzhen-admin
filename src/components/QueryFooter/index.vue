<!--
 * @Description: 表格自定义搜索底部按钮
 * @Author: ljf
 * @Date: 2022-08-11 09:16:46
 * @LastEditors: ljf
 * @LastEditTime: 2022-08-11 13:50:19
-->
<script lang="tsx">
import { defineComponent, PropType } from "vue";
import { Button, Space } from 'ant-design-vue';
import { SearchOutlined } from "@ant-design/icons-vue";
import { FilterDropdownProps, ColumnType } from "ant-design-vue/es/table/interface";
export default defineComponent({
    props: {
        filterDropdownProps: {
            type: Object as PropType<FilterDropdownProps<ColumnType>>,
            default: () => { }
        }
    },
    emits: ['handleSearch', 'handleReset'],
    setup(props, context) {
        return () => (
            <Space size={10}>
                <Button type="primary"
                    size="small"
                    onClick={() => context.emit('handleSearch', props.filterDropdownProps)}>
                    {{ icon: () => <SearchOutlined />, default: () => ' 搜索' }}
                </Button>
                <Button type="primary"
                    size="small"
                    onClick={() => context.emit('handleReset', props.filterDropdownProps)}>
                    重置
                </Button>
            </Space>
        )
    }
})
</script>