import { defineStore } from "pinia";
import { ref } from "vue";
import { getCurrentUser } from "@/api/user";
export const useLoginUserStore = defineStore("loginUser", () => {
    const loginUser = ref({
        userName: "未登录",
    });
    async function fetchLoginUser() {
        const res = await getCurrentUser();
        if (res.data.code === 0 && res.data.data) {
            loginUser.value = res.data.data;
        }
    }
    function setLoginUser(newLoginUser) {
        loginUser.value = newLoginUser;
    }
    return { loginUser, setLoginUser, fetchLoginUser };
});
