<template>
  <div id="userRegisterPage">
    <h2 class="title">用户注册</h2>
    <a-form
      :model="formState"
      name="normal_login"
      label-align="left"
      class="login-form"
      @finish="handleSubmit"
    >
      <a-form-item
        label="用户名"
        name="userAccount"
        :rules="[{ required: true, message: '请输入账户' }]"
      >
        <a-input v-model:value="formState.userAccount" placeholder="请输入账号">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        label="密码"
        name="userPassword"
        :rules="[{ required: true, message: '请输入密码 ' } ,{min :8,message:'密码不能小于八位'}]"
      >
        <a-input-password v-model:value="formState.userPassword " placeholder="请输入密码">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item
        label="确认密码"
        name="checkPassword"
        :rules="[{ required: true, message: '再次输入密码 ' } ,{min :8,message:'密码不能小于八位'}]"
      >
        <a-input-password v-model:value="formState.checkPassword " placeholder="再次输入密码">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-button  type="primary" html-type="submit" class="login-form-button">
          注册
          </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { userLogin, userRegister } from '@/api/user'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/store/useLoginUserStore'
import { message } from 'ant-design-vue'
interface FormState {
  userAccount: string;
  userPassword: string;
  checkPassword: string;
}
const formState = reactive<FormState>({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
});


const router = useRouter();
const loginUserStore = useLoginUserStore();


/**
 * 提交表单
 * @param data
 */
const handleSubmit = async (values: any) => {
  if(values.userPassword !== values.checkPassword){
    message.error("密码不一致");
    return;
  }
  const res = await userRegister(values);
  // 注册成功，跳转到登录页
  if (res.data.code === 0 ) {
    message.success("注册成功");
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败"+res.data.description);
  }
};

</script>
<style scoped>
#userRegisterPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.title {
  margin-bottom: 40px;  /* 标题与表单间距 */
  font-size: 24px;
  text-align: center;
}

.login-form {
  width: 100%;
  max-width: 400px;  /* 控制表单最大宽度 */
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.login-form-button {
  width: 100%;
}
</style>

