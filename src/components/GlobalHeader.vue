<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="240px">
        <div class="title-bar">
          <img class="logo" src="@/assets/logo1.jpg" alt="logo" />
          <span class="title">Hunter 用户中心</span>
        </div>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="120px">
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id" class="user-info">
            <a-dropdown>
              <div class="user-dropdown-link">
                <a-avatar :size="32">
                  <UserOutlined />
                </a-avatar>
                <span class="username">{{ loginUserStore.loginUser.userName ?? '昵称' }}</span>
                <DownOutlined />
              </div>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="profile" @click="doMenuClick({key: '/user/update'})">
                    <UserOutlined />
                    <span>个人设置</span>
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="logout" @click="handleLogout">
                    <LogoutOutlined />
                    <span>退出登录</span>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div v-else class="user-info">
            <a-dropdown>
              <div class="user-dropdown-link">
                <a-avatar :size="32">
                  <UserOutlined />
                </a-avatar>
                <span class="username">未登录</span>
                <DownOutlined />
              </div>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="login" @click="doMenuClick({key: '/user/login'})">
                    <UserOutlined />
                    <span>登录</span>
                  </a-menu-item>
                  <a-menu-item key="register" @click="doMenuClick({key: '/user/register'})">
                    <AppstoreOutlined />
                    <span>注册</span>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue'
import { AppstoreOutlined, SettingOutlined, UserOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/store/useLoginUserStore.ts'
import { message } from 'ant-design-vue'

const loginUserStore = useLoginUserStore()
loginUserStore.fetchLoginUser()

const router = useRouter()

const handleLogout = async () => {
  const res = await loginUserStore.logout()
  if (res) {
    message.success('注销成功')
    // 跳转到登录页
    router.push({
      path: '/user/login',
    })
  } else {
    message.error('注销失败')
  }
}

const doMenuClick = (info: { key: string }) => {
  router.push({
    path: info.key,
  })
}

// 当前选中菜单
const current = ref<string[]>([])
// 监听路由变化，更新当前选中菜单
router.afterEach((to, from, failure) => {
  current.value = [to.path]
})

const items = ref<MenuProps['items']>([
  {
    key: '/',
    label: '主页',
    title: '主页',
    icon: () => h(AppstoreOutlined),
  },
  // 未登录时显示
  ...(!loginUserStore.loginUser.id ? [
    {
      key: '/user/login',
      icon: () => h(UserOutlined),
      label: '用户登录',
      title: '用户登录',
    },
    {
      key: '/user/register',
      icon: () => h(AppstoreOutlined),
      label: '用户注册',
      title: '用户注册',
    },
  ] : []),
  // 登录后显示
  ...(loginUserStore.loginUser.id ? [
    {
      key: '/user/update',
      icon: () => h(UserOutlined),
      label: '个人信息',
      title: '个人信息',
    },
    {
      key: '/admin/account',
      icon: () => h(SettingOutlined),
      label: '用户管理',
      title: '用户管理',
    },
  ] : []),
  {
    key: '/help',
    icon: () => h(AppstoreOutlined),
    label: '赞助主包',
    title: '赞助主包',
  },
])
</script>
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 8px;
}

.logo {
  height: 32px;
  margin-right: 12px;
  display: flex;
  align-items: center;
}

.title {
  font-size: 18px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  white-space: nowrap;
  line-height: 48px;
  display: inline-block;
  vertical-align: middle;
}

.user-login-status {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-dropdown-link:hover {
  background-color: rgba(0, 0, 0, 0.025);
}

.username {
  margin: 0 8px;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.85);
}

@media (max-width: 576px) {
  .username {
    display: none;
  }
  
  .title {
    font-size: 16px;
  }
  
  .logo {
    height: 28px;
  }
}

:deep(.ant-dropdown-menu-item) {
  min-width: 160px;
}

:deep(.anticon) {
  margin-right: 8px;
}
</style>
