<template>
  <div id="basicLayout">
    <a-layout>
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://github.com/hunt10086" target="_blank"> Hunter 管理中心 </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
//import { getCurrentUser } from '@/api/user.ts'

// getCurrentUser().then((res) => {
//   alert("fjkhgfaf")
//   console.log(res)
// })

</script>
<style scoped>
#basicLayout .header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100; /* 确保header在顶层 */
  padding: 0 20px; /* 与内容区域对齐 */
  background: #ffffff;
}

#basicLayout .content {
  margin-top: 64px;
  margin-bottom: 40px; /* 匹配footer高度 */
  min-height: calc(100vh - 64px - 40px);
  padding: 20px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.67);
}

#basicLayout .footer {
  background: rgba(30, 236, 236, 0.67);
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

/* 在 <style> 中添加 */
@media (max-width: 768px) {
  #basicLayout .header {
    height: 56px !important; /* 移动端适配 */
  }

  #basicLayout .content {
    margin-top: 56px;
  }
}
</style>
