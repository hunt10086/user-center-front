import { createRouter, createWebHistory } from 'vue-router'

import HelloView from '@/views/HelloView.vue'
import Login from '@/views/user/Login.vue'
import Register from '@/views/user/Register.vue'
import Manage from '@/views/admin/userManage.vue'
import Support from '@/views/Support.vue'
type CustomRoute = {
  path: string,
  name?: string,
  component: any
}

const routes:CustomRoute[] = [
  {
    path: '/',
    name: 'home',
    component : HelloView // 需要创建的真实组件
  },
  {
    path: '/user/login',
    name: '用户登录',
    component: Login
  },
  {
    path: '/user/register',
    name: '用户注册',
    component: Register
  },
  {
    path: '/admin/account',
    name: '用户管理',
    component: Manage
  },
  {
    path: '/help',
    name: '赞助主包',
    component: Support
  },
]

const router = createRouter({
  history:createWebHistory(),
  routes
})
export default router