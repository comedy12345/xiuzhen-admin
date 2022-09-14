<template>
  <a-spin tip="登录中..." :spinning="spinning">
    <div class="login">
      <div class="login-container">
        <div class="img-box">
          <img src="/assets/login-cover.webp" alt="" />
        </div>
        <div class="login-form-box">
          <div class="box-center">
            <div class="login-title">
              <img src="https://www.surely.cool/surely-vue-logo.png" alt="" />
              <span> 修正游戏后台管理系统 </span>
            </div>
            <a-form labelAlign="left" :label-col="{ span: 4 }">
              <a-form-item label="用户名" name="username">
                <a-input v-model:value="loginData.userName">
                  <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item label="密码" name="password">
                <a-input-password v-model:value="loginData.passwd">
                  <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                  </template>
                </a-input-password>
              </a-form-item>

              <div class="login-action">
                <a-form-item>
                  <a-button @click="login">登录</a-button>
                </a-form-item>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { reactive, ref } from 'vue';
import { ILoginRequest } from '@/interface/loginTypes';
import { reqLogin } from "@/api/loginApi";
import useUserInfoStore from "@/store/userInfo";
import { getCurrentUserInfo } from '@/api/userApi';
const router = useRouter();
const route = useRoute();
const loginData = reactive<ILoginRequest>({
  userName: '',
  passwd: '',
})
const spinning = ref(false);
// 登录
const login = async () => {
  try {
    spinning.value = true;
    const { login } = useUserInfoStore()
    const { data: { token } } = await reqLogin(loginData);
    login({ token });
    const { data } = await getCurrentUserInfo();
    data.token = token;
    login(data);
    const redirect = (route.query['redirect'] as string);
    if (redirect) {
      router.push(redirect);
    } else {
      router.push('/');
    }
  } finally {
    spinning.value = false;
  }


}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0 0 0 / 5%);

  .login-container {
    background: white;
    height: 80vh;
    width: 65vw;
    display: flex;
    justify-content: center;
    align-content: center;
    box-shadow: 0px 0px 7px #d9d9d9;
    border-radius: 8px;

    .img-box {
      flex: 1;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px 0 0 8px;
      }
    }

    .login-form-box {
      flex: 1;
      padding: 0 30px;

      display: flex;
      justify-content: center;
      align-items: center;

      .box-center {
        .login-title {
          font-size: 28px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 80px;

          img {
            height: 50px;
            width: 50px;
          }
        }

        .login-action {
          display: flex;
          justify-content:flex-end;
        }
      }
    }
  }
}
</style>