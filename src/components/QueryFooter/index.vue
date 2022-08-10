<script lang="tsx">
import { defineComponent } from "vue";
import { Button } from 'ant-design-vue';
import { SearchOutlined } from "@ant-design/icons-vue";
import { FilterDropdownProps } from "ant-design-vue/es/table/interface";
import { ColumnType } from "ant-design-vue/es/vc-table/interface";


export default defineComponent({
    props: {
        filterDropdownProps: {
            type: Object,
            default: () => { }
        }
    },
    emits: ['handleSearch', 'handleReset'],
    setup(props, context) {

        return () => (
            <>
                <Button type="primary"
                    size="small"
                    style="width: 90px; margin-right: 8px;margin-top:5px"
                    onClick={() => context.emit('handleSearch', props.filterDropdownProps)} >
                    {{
                        icon: () => <SearchOutlined />,
                        default: () => ' 搜索'
                    }}
                </Button>
                <Button type="primary"
                    size="small"
                    style="width: 90px; margin-right: 8px;margin-top:5px"
                    onClick={() => context.emit('handleReset', props.filterDropdownProps)}>
                    重置
                </Button>
            </>
        )
    }
})
</script>