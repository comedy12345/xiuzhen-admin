import { updatePassword } from "@/api/userApi";
import { IUpdPwd } from "@/interface/userType";
import useUserInfoStore from "@/store/userInfo";
import { message } from "ant-design-vue";
import { RuleObject } from "ant-design-vue/es/form";
import { ref } from "vue";

/*
 * @Description: 修改密码
 * @Author: ljf
 * @Date: 2022-09-13 17:03:46
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-13 17:08:29
 */
export default function updPwdHook() {
    const { $state } = useUserInfoStore();
    const visible = ref(false);
    const handleUpdPwd = () => {
        visible.value = true;
    }

    const pwdForm = ref<IUpdPwd>({});

    const updPwdSave = async () => {
        pwdForm.value.qrPwd = undefined;
        pwdForm.value.tid = $state.tid;
        const res = await updatePassword(pwdForm.value);
        visible.value = false;
        pwdForm.value = {};
        message.success(res.data);
    }
    const validator = (rule: RuleObject, value: string) => {
        console.log(rule)
        console.log(value);
    }
    const rules = {
        wornPasswd: [{ required: true, validator, trigger: 'change' }],
        passwd: [],
        qrPwd: []
    };

    return { $state, visible, rules,pwdForm, handleUpdPwd, updPwdSave, validator }
}