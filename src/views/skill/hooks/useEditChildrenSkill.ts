import { reactive, ref } from "vue";

export default function useEditChildrenSkill(editType: number) {

    // 子技能编辑相关
    const editChildrenSkill = ref(false);
    const editChildrenTitle = ref('');
    const children = reactive<any[]>([]);

    // 弹出子技能编辑框
    const handlerEditChildren = () => {
        editChildrenSkill.value = true;
        editChildrenTitle.value = '新增子技能';
    }

    // 控制子技能弹出层插入位置
    const getContaine = ref('.edit-skill-container');
    if (!editType) {
        getContaine.value = '.edit-skill-container .ant-modal-content';
    }

    // 保存子技能
    const handlerChildrenOk = (value: any) => {
        children.push(value);
    }

    return {
        editChildrenSkill,
        editChildrenTitle,
        children,
        getContaine,
        handlerEditChildren,
        handlerChildrenOk
    }
}