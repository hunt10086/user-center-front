/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { userLogin } from '@/api/user';
import { useRouter } from 'vue-router';
import { useLoginUserStore } from '@/store/useLoginUserStore';
import { message } from 'ant-design-vue';
const formState = reactive({
    userAccount: '',
    userPassword: '',
});
const router = useRouter();
const loginUserStore = useLoginUserStore();
/**
 * 提交表单
 * @param data
 */
const handleSubmit = async (value) => {
    const res = await userLogin(value);
    // 登录成功，跳转到主页
    if (res.data.code === 0 && res.data.data) {
        await loginUserStore.fetchLoginUser();
        message.success("登录成功");
        router.push({
            path: "/",
            replace: true,
        });
    }
    else {
        message.error("登录失败" + res.data.description);
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "userLoginPage",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "title" },
});
const __VLS_0 = {}.AForm;
/** @type {[typeof __VLS_components.AForm, typeof __VLS_components.aForm, typeof __VLS_components.AForm, typeof __VLS_components.aForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onFinish': {} },
    model: (__VLS_ctx.formState),
    name: "normal_login",
    labelAlign: "left",
    ...{ class: "login-form" },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onFinish': {} },
    model: (__VLS_ctx.formState),
    name: "normal_login",
    labelAlign: "left",
    ...{ class: "login-form" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onFinish: (__VLS_ctx.handleSubmit)
};
__VLS_3.slots.default;
const __VLS_8 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    label: "用户名",
    name: "userAccount",
    rules: ([{ required: true, message: '请输入账户' }]),
}));
const __VLS_10 = __VLS_9({
    label: "用户名",
    name: "userAccount",
    rules: ([{ required: true, message: '请输入账户' }]),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    value: (__VLS_ctx.formState.userAccount),
    placeholder: "请输入账号",
}));
const __VLS_14 = __VLS_13({
    value: (__VLS_ctx.formState.userAccount),
    placeholder: "请输入账号",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
{
    const { prefix: __VLS_thisSlot } = __VLS_15.slots;
    const __VLS_16 = {}.UserOutlined;
    /** @type {[typeof __VLS_components.UserOutlined, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        ...{ class: "site-form-item-icon" },
    }));
    const __VLS_18 = __VLS_17({
        ...{ class: "site-form-item-icon" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
}
var __VLS_15;
var __VLS_11;
const __VLS_20 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    label: "密码",
    name: "userPassword",
    rules: ([{ required: true, message: '请输入密码 ' }, { min: 8, message: '密码不能小于八位' }]),
}));
const __VLS_22 = __VLS_21({
    label: "密码",
    name: "userPassword",
    rules: ([{ required: true, message: '请输入密码 ' }, { min: 8, message: '密码不能小于八位' }]),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
const __VLS_24 = {}.AInputPassword;
/** @type {[typeof __VLS_components.AInputPassword, typeof __VLS_components.aInputPassword, typeof __VLS_components.AInputPassword, typeof __VLS_components.aInputPassword, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    value: (__VLS_ctx.formState.userPassword),
    placeholder: "请输入密码",
}));
const __VLS_26 = __VLS_25({
    value: (__VLS_ctx.formState.userPassword),
    placeholder: "请输入密码",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
{
    const { prefix: __VLS_thisSlot } = __VLS_27.slots;
    const __VLS_28 = {}.LockOutlined;
    /** @type {[typeof __VLS_components.LockOutlined, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        ...{ class: "site-form-item-icon" },
    }));
    const __VLS_30 = __VLS_29({
        ...{ class: "site-form-item-icon" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
}
var __VLS_27;
var __VLS_23;
const __VLS_32 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({}));
const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
const __VLS_36 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    type: "primary",
    htmlType: "submit",
    ...{ class: "login-form-button" },
}));
const __VLS_38 = __VLS_37({
    type: "primary",
    htmlType: "submit",
    ...{ class: "login-form-button" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
var __VLS_39;
var __VLS_35;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['login-form']} */ ;
/** @type {__VLS_StyleScopedClasses['site-form-item-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['site-form-item-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['login-form-button']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            UserOutlined: UserOutlined,
            LockOutlined: LockOutlined,
            formState: formState,
            handleSubmit: handleSubmit,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
