<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <div id="title-bar">
          <img class="logo" src="@/assets/logo1.jpg" alt="logo" />
          Hunter 用户中心
          <div class="title"></div>
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
          <a-dropdown v-if="loginUserStore.loginUser.id" placement="bottomRight">
            <div class="user-info-wrapper">
              {{ loginUserStore.loginUser.userName ?? '昵称' }}
              <DownOutlined class="dropdown-icon" />
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item key="logout" @click="logout">
                  <template #icon>
                    <LogoutOutlined />
                  </template>
                  注销登录
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <div v-else>
            <a-button type="primary" href="http://123.249.124.78:8000">首页</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue'
import { message } from 'ant-design-vue';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/store/useLoginUserStore.ts'
import { userLogout } from '@/api/user'
import { LogoutOutlined,DownOutlined } from '@ant-design/icons-vue'

const loginUserStore = useLoginUserStore()
loginUserStore.fetchLoginUser()

const router = useRouter()

const doMenuClick = ({ key }: { key: any }) => {
  router.push({
    path: key,
  })
}

const logout = async () => {
  try {
    await userLogout()
    loginUserStore.logout()
    alert('注销成功')
    router.push('/user/login')
  } catch (e) {
    console.error('注销失败:', e)
  }
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
  },
  {
    key: '/user/login',
    icon: () => h(AppstoreOutlined),
    label: '用户登录',
    title: '用户登录',
  },
  {
    key: '/user/register',
    label: '用户注册',
    title: '用户注册',
  },
  {
    key: '/admin/account',
    icon: () => h(SettingOutlined),
    label: '用户管理',
    title: '用户管理',
  },
  {
    key: '/help',
    label: '赞助主包',
    title: '赞助主包',
  },
  {
    key: '/user/update',
    label: '修改信息',
    title: '修改信息',
  }
  // {
  //   key: 'alipay',
  //   label: h('a', { href: 'https://antdv.com', target: '_blank' }, 'Navigation Four - Link'),
  //   title: 'Navigation Four - Link',
  // },
])
</script>
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 36px;
}
</style>
