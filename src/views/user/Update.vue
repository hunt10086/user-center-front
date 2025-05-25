<template>
  <a-table :columns="columns" :data-source="data" :loading="loading">
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
          <a-button type="primary" @click="handleEdit(record)">编辑</a-button>
          <a-button danger @click="handleDelete(record.id)" style="margin-left: 8px">删除</a-button>
          <a-modal
            v-model:open="visible"
            title="用户信息修改"
            ok-text="确认修改"
            cancel-text="取消"
            @ok="onOk"
          >
            <a-form
              ref="formRef"
              :model="formState"
              layout="vertical"
            >
              <a-form-item
                label="用户名"
                name="userName"
                :rules="[{ required: true, message: '请输入用户名' }]"
              >
                <a-input v-model:value="formState.userName" placeholder="请输入用户名">
                  <template #prefix>
                    <UserOutlined />
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
                :rules="[{ required: true, message: '请输入电话' }]"
              >
                <a-input v-model:value="formState.phone" placeholder="请输入电话">
                  <template #prefix>
                    <PhoneOutlined />
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
                    <MailOutlined />
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
                    <UserOutlined />
                  </template>
                </a-input>
              </a-form-item>
            </a-form>
          </a-modal>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { deleteUser, searchUser, updateUser } from '@/api/user'
import { message } from 'ant-design-vue'
import { reactive, ref, toRaw } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons-vue'

interface UserItem {
  id: number;
  userName: string;
  userAccount: string;
  avatarUrl: string;
  gender: number;
  phone: string;
  email: string;
  createTime: string;
  userRole: number;
}

interface Values extends Omit<UserItem, 'id' | 'createTime' | 'userRole'> {}

const formRef = ref<FormInstance>();
const visible = ref(false);
const loading = ref(false);
const data = ref<UserItem[]>([]);
const formState = reactive<Values>({
  userName: '',
  gender: 0,
  phone: '',
  email: '',
  avatarUrl: '',
  userAccount: ''
});

const columns = [
  { title: 'ID', dataIndex: 'id' },
  { title: '用户名', dataIndex: 'userName' },
  { title: '账号', dataIndex: 'userAccount' },
  { title: '头像', dataIndex: 'avatarUrl' },
  { title: '性别', dataIndex: 'gender' },
  { title: '电话', dataIndex: 'phone' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '用户角色', dataIndex: 'userRole' },
  { title: '操作', key: 'action' }
]

// 数据加载
const getData = async () => {
  try {
    loading.value = true;
    const res = await searchUser();
    data.value = res.data.data || [];
  } catch (error) {
    message.error('数据加载失败');
  } finally {
    loading.value = false;
  }
}

// 编辑回填
const handleEdit = (record: UserItem) => {
  visible.value = true;
  Object.assign(formState, record);
}

// 提交修改
const onOk = async () => {
  try {
    const values = await formRef.value?.validateFields();
    if (values) {
      const res = await updateUser(toRaw(formState));
      if (res.data.code === 0) {
        message.success('修改成功');
        getData();
        visible.value = false;
      }
    }
  } catch (error) {
    message.error('修改失败');
  }
}

// 删除操作
const handleDelete = async (id: number) => {
  try {
    await deleteUser(id);
    message.success('删除成功');
    getData();
  } catch (error) {
    message.error('删除失败');
  }
}

// 初始化加载数据
getData();
</script>

<style scoped>
.collection-create-form_last-form-item {
  margin-bottom: 0;
}
</style>
