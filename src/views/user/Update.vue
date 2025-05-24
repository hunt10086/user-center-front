<template>
  <div>
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'avatarUrl'">
          <a-image :src="record.avatarUrl" :width="120" />
        </template>
        <template v-else-if="column.dataIndex === 'userRole'">
          <div v-if="record.userRole === 1">
            <a-tag color="green">管理员</a-tag>
          </div>
          <div v-else>
            <a-tag color="blue">普通用户</a-tag>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'gender'">
          <div v-if="record.gender === 0">
            <a-tag color="green">未知</a-tag>
          </div>
          <div v-if="record.gender===1">
            <a-tag color="blue">男</a-tag>
          </div>
          <div v-if="record.gender===2">
            <a-tag color="blue">女</a-tag>
          </div>
        </template>


        <template v-if="column.dataIndex === 'createTime'">
          <div>{{ new Date(record.createTime).toLocaleString() }}</div>
        </template>

        <template v-else-if="column.key === 'action'">
          <div>
            <a-button type="primary" @click="editUser(record)">修改</a-button>
            <a-modal class="model"
              v-model:open="visible"
              title="修改个人信息"
              ok-text="确认"
              cancel-text="取消"
              @ok="onOk"
            >
              <a-form
                ref="formRef"
                :model="formState"
              >
                <a-form-item
                  label="用户名"
                  name="userName"
                  :rules="[{ required: true, message: '请输入用户名' }]"
                >
                  <a-input v-model:value="formState.userName" placeholder="请输入用户名">
                    <template #prefix>
                      <UserOutlined class="site-form-item-icon" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item
                  label="头像地址"
                  name="avatarUrl"
                  :rules="[{ required: true, message: '请输入头像地址' }]"
                >
                  <a-input v-model:value="formState.avatarUrl" placeholder="请输入头像地址">
                    <template #prefix>
                      <UserOutlined class="site-form-item-icon" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item
                  label="性别"
                  name="gender"
                  :rules="[{ required: true, message: '请选择性别' }]"
                >
                  <a-select v-model:value="formState.gender" placeholder="请选择性别">
                    <a-select-option :value="0">未知</a-select-option>
                    <a-select-option :value="1">男</a-select-option>
                    <a-select-option :value="2">女</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  label="电话"
                  name="phone"
                  :rules="[{ required: true, message: '请输入电话号码' }]"
                >
                  <a-input v-model:value="formState.phone" placeholder="请输入电话号码">
                    <template #prefix>
                      <UserOutlined class="site-form-item-icon" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item
                  label="邮箱"
                  name="email"
                  :rules="[{ required: true, message: '请输入邮箱' }]"
                >
                  <a-input v-model:value="formState.email" placeholder="请输入邮箱">
                    <template #prefix>
                      <UserOutlined class="site-form-item-icon" />
                    </template>
                  </a-input>
                </a-form-item>
              </a-form>
            </a-modal>
          </div>
        </template>

      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>



import { reactive ,toRaw } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { ref } from 'vue'
import { updateUser, searchUser} from '@/api/user'
import { message } from 'ant-design-vue'
import { UserOutlined } from '@ant-design/icons-vue'

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '用户名',
    dataIndex: 'userName',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },
  {
    title: '电话',
    dataIndex: 'phone',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
  },
  {
    title: '修改 ',
    key: 'action',
  },
]


interface Values {
  id?: number;
  userName?: string;
  avatarUrl?: string;
  gender: number;
  phone?: string;
  email?: string;
}

const formRef = ref<FormInstance>();
const visible = ref(false);
const formState = reactive<Values>({
  id: undefined,
  userName: '',
  avatarUrl: '',
  gender: 0,
  phone: '',
  email: '',
});

const editUser = (record: any) => {
  // 将当前行数据填充到表单中
  formState.id = record.id;
  formState.userName = record.userName;
  formState.avatarUrl = record.avatarUrl;
  formState.gender = record.gender;
  formState.phone = record.phone;
  formState.email = record.email;
  visible.value = true;
};

const onOk = () => {
  formRef.value
    ?.validateFields()
    .then(async () => {
      try {
        const values = toRaw(formState);
        const res = await updateUser(values);
        if (res.data.code === 0) {
          message.success('修改成功');
          visible.value = false;
          formRef.value?.resetFields();
          // 刷新表格数据
          getData();
        } else {
          message.error(res.data.message || '修改失败');
        }
      } catch (error) {
        message.error('修改失败');
        console.error('Update failed:', error);
      }
    })
    .catch(info => {
      console.log('Validate Failed:', info);
    });
};





const data = ref([]);

const getData = async () => {
  const res = await searchUser()
  if (res.data.data) {
    data.value = res.data.data||[]
  } else {
    data.value = [];
    message.error('获取数据失败')
  }
}


getData()
</script>
<style scoped>
.collection-create-form_last-form-item {
  margin-bottom: 0;
}
.model {
  padding: 40px;
  max-width: 800px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>

