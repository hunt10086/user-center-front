import { defineStore } from "pinia";
import { ref } from "vue";
import { getCurrentUser, userLogout } from "@/api/user";

export const useLoginUserStore = defineStore("loginUser", () => {
  const loginUser = ref<any>({
    userName: "未登录",
  });

  async function fetchLoginUser() {
    const res = await getCurrentUser();
    if (res.data.code === 0 && res.data.data) {
      loginUser.value = res.data.data;
    }
  }



  function setLoginUser(newLoginUser: any) {
    loginUser.value = newLoginUser;
  }

  async function logout() {
    const res = await userLogout();
    if (res.data.code === 0) {
      // 清除用户状态
      loginUser.value = {
        userName: "未登录",
      };
      return true;
    }
    return false;
  }

  return { loginUser, setLoginUser, fetchLoginUser, logout };
});
