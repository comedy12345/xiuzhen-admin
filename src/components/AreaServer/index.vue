<!--
 * @Description: 文件描述
 * @Author: ljf
 * @Date: 2022-08-17 08:40:28
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-09 10:00:28
-->
<script lang="tsx">
import { defineComponent } from 'vue';
import { Select } from 'ant-design-vue';
import useAreaServerHook from "./hooks/areaServerHook";
import { SelectValue } from 'ant-design-vue/lib/select';

const AreaServer = defineComponent({
    props: {
        value: {
            type: Number,
            default: null
        },
        multiple:{
            type:Boolean,
            default:false
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
                    multiple={props.value}
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