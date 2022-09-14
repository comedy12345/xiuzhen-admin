import { updatePassword } from "@/api/userApi";
import { IUpdPwd } from "@/interface/userType";
import useUserInfoStore from "@/store/userInfo";
import { Form, message } from "ant-design-vue";
import { reactive, ref } from "vue";

/*
 * @Description: 修改密码
 * @Author: ljf
 * @Date: 2022-09-13 17:03:46
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-14 10:26:16
 */
export default function updPwdHook() {
    const useForm = Form.useForm;
    const validator = (rule: any, value: string) => {
        switch (rule.field) {
            case 'wornPasswd':
                if (!value) return Promise.reject('请输入当前密码');
                return Promise.resolve();
            case 'passwd':
                if (!value) return Promise.reject('请输入修改的密码');
                if ((pwdForm.passwd !== pwdForm.qrPwd) && pwdForm.qrPwd) return Promise.reject('密码不一致');
                return Promise.resolve();
            case 'qrPwd':
                if (!value) return Promise.reject('请再次输入修改的密码');
                if (pwdForm.passwd !== pwdForm.qrPwd) return Promise.reject('密码不一致');
                return Promise.resolve();
            default:
                return Promise.resolve();
        }
    }
    const rules = reactive({
        wornPasswd: [{ required: true, validator, trigger: 'blur' }],
        passwd: [{ required: true, validator, trigger: 'blur' }],
        qrPwd: [{ required: true, validator, trigger: 'blur' }],
    });
    const pwdForm = reactive<IUpdPwd>({ passwd: undefined, qrPwd: undefined, wornPasswd: undefined });
    const { resetFields, validate, validateInfos } = useForm(pwdForm, rules);
    const { $state ,logout} = useUserInfoStore();
    const visible = ref(false);

    const handleUpdPwd = () => {
        visible.value = true;
    }

    const updPwdSave = async () => {
        await validate()
        pwdForm.qrPwd = undefined;
        pwdForm.tid = $state.tid;
        const res = await updatePassword(pwdForm);
        visible.value = false;
        resetFields();
        message.success(res.data);
        logout();
    }


    return { $state, visible, rules, pwdForm, validateInfos, handleUpdPwd, updPwdSave, validator, validate, logout}
}