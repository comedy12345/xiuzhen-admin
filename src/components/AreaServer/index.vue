<!--
 * @Description: 文件描述
 * @Author: ljf
 * @Date: 2022-08-17 08:40:28
 * @LastEditors: ljf
 * @LastEditTime: 2022-08-17 18:00:19
-->
<script lang="tsx">
import { defineComponent, ref, toRefs, watch } from 'vue';
import { Select } from 'ant-design-vue';
import useAreaServerHook from "./hooks/areaServerHook";
import { SelectValue } from 'ant-design-vue/lib/select';

const AreaServer = defineComponent({
    props: {
        value: {
            type: String,
            default: null
        }
    },
    emits: ['update:value'],
    setup(props, context) {
        const { options } = useAreaServerHook();
        const handlerChange = (value: SelectValue) => {
            context.emit('update:value', value)
        }
        return () => (
            <>
                <Select
                    value={props.value}
                    options={options.value}
                    multiple={false}
                    onChange={handlerChange}
                    style="width: 100%"
                    placeholder='请选择区'
                />
            </>
        )
    }
})
export default AreaServer;
</script>