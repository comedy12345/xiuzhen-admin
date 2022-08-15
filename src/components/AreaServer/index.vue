<script lang="tsx">
import { defineComponent, ref, toRefs, watch } from 'vue';
import { Select } from 'ant-design-vue';
import useAreaServerHook from "./hooks/areaServerHook";
import { SelectValue } from 'ant-design-vue/lib/select';

const AreaServer = defineComponent({
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    emits: ['update:value'],
    setup(props, context) {
        const { value } = toRefs(props);
        const { options } = useAreaServerHook();
        const handlerChange = (value: SelectValue) => {
            context.emit('update:value', value)
        }
        return () => (
            <>
                <Select
                    value={value.value}
                    options={options.value}
                    multiple={false}
                    onChange={handlerChange}
                    style="width: 100%"
                />
            </>
        )
    }
})
export default AreaServer;
</script>