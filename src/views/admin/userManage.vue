<template>
  <div class="userManage">
    <a-input-search
      style="margin-bottom: 20px"
      v-model:value="searchValue"
      placeholder="输入用户名搜素"
      enter-button="搜素"
      size="large"
      @search="onSearch"
    />
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
          <a-divider type="vertical" />
          <a-button danger @click="doDelete(record.id)">删除</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { deleteUser, searchUser, searchUsers } from '@/api/user'
import { message } from 'ant-design-vue'
import { ref } from 'vue'

const searchValue = ref('')

const doDelete = async (id: string) => {
  if (!id) {
    return
  }
  const res = await deleteUser(id)
  if (res.data.data === true) {
    message.success('删除成功')
  } else {
    message.error('删除失败')
  }
}

const onSearch = () => {
  getData(searchValue.value)
}

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
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const data = ref([])

const getData = async (userName = '') => {
  const res = await searchUsers(userName)
  if (res.data.data) {
    data.value = res.data.data || []
  } else {
    message.error('获取数据失败')
  }
}

getData()
</script>
