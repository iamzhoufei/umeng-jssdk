<template>
  <teleport to="#login-target">
    <van-overlay :show="visible" :style="{ zIndex: 11, backgroundColor: 'rgba(0, 0, 0, 0.6)' }">
      <div class="login-wrapper">
        <div class="upi-logo-wrapper">
          <img
            class="upi-logo"
            src="https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-common/upi-icon.jpg"
          />
        </div>
        <van-form label-align="center">
          <div class="input-wrapper" :class="focusOn === 'mobile' ? 'input-wrapper-shadow' : ''">
            <span class="country-code">+86</span>
            <span class="line"></span>
            <input
              v-model="form.mobile"
              type="tel"
              class="input-item"
              placeholder="请输入手机号"
              @focus="handleSetFocus('mobile')"
              @blur="handleSetFocus('')"
            />
          </div>

          <div class="input-wrapper" :class="focusOn === 'code' ? 'input-wrapper-shadow' : ''">
            <input
              v-model="form.code"
              type="tel"
              class="input-item"
              placeholder="请输入短信验证码"
              @focus="handleSetFocus('code')"
              @blur="handleSetFocus('')"
            />
            <div
              class="send-code-btn"
              :style="countdown < 60 ? { background: 'lightgrey' } : {}"
              @click="handleGetCode()"
            >
              <!-- eslint-disable-next-line vue/no-parsing-error -->
              {{ countdown < 60 ? `${countdown}s` : '获取' }}
            </div>
          </div>

          <div class="agreement-check">
            <van-checkbox
              v-model="form.agreement"
              checked-color="#FF3C44"
              label-disabled
              shape="square"
              icon-size="14px"
            >
              <div class="agreement-check-inner">
                我已阅读并同意
                <a
                  class="link"
                  target="_blank"
                  href="https://zhuawan-tech.gitee.io/blackboard/upi-terms-of-service.html"
                  >《游派服务条款》</a
                >及
                <a
                  class="link"
                  target="_blank"
                  href="https://zhuawan-tech.gitee.io/blackboard/upi-privacy-policy.html"
                  >《隐私协议》</a
                >
              </div>
            </van-checkbox>
          </div>

          <div style="margin: 16px;">
            <van-button
              class="submit-btn"
              :class="isActive ? 'isActive' : 'disabled'"
              @click="handleLogin()"
              >登录</van-button
            >
          </div>
        </van-form>
        <div class="close-btn" @click="handleHide()"></div>
      </div>
    </van-overlay>
  </teleport>
</template>

<script lang="ts">
  import { ref, reactive, computed } from 'vue';
  import { useStore } from 'vuex';
  import Cookies from 'js-cookie';

  import { regex, toast } from '@/utils';
  import { ErrorCode } from '@/models';
  import { login, sendCode } from '@/services';

  export default {
    name: 'LoginModalView',

    setup() {
      const store = useStore();
      // TODO: 修改类型
      // const form:any = computed(() => store.state.login.form)
      const form = reactive({
        mobile: '',
        code: '',
        agreement: false
      });
      const timer: any = ref(null);

      const focusOn = ref('');
      const countdown = ref(60);
      const visible = ref(computed(() => store.state.login.visible));
      const isActive = computed(
        () => regex.isMobile(form.mobile) && regex.isAuthCode(form.code) && form?.agreement
      );

      const handleHide = () => store.commit('login/hide');

      // 获取当前焦点，用于改变输入框样式
      const handleSetFocus = (node: 'mobile' | 'code' | '') => {
        focusOn.value = node;
      };

      // 关闭弹窗时清空数据
      const handleClear = () => {
        form.mobile = '';
        form.code = '';
        form.agreement = false;
        focusOn.value = '';
      };

      // 获取验证码
      const handleGetCode = async () => {
        if (countdown.value !== 60) return;

        if (!form.mobile || !regex.isMobile(form.mobile)) {
          toast('请输入正确的手机号', 'fail');
          return;
        }

        const result = await sendCode({ mobile: form.mobile });

        if (!result?.code) {
          countdown.value -= 1;

          //60秒倒计时
          if (!timer.value) {
            timer.value = setInterval(() => {
              if (countdown.value > 1 && countdown.value <= 60) {
                countdown.value -= 1;
              } else {
                clearInterval(timer.value);
                timer.value = null;
                countdown.value = 60;
              }
            }, 1000);
          }
        } else {
          if (result.code === ErrorCode['请求过快, 需要验证']) {
            toast('请到游派App中进行登录', 'fail');
            return;
          }
          toast(result?.message || '系统繁忙，请稍后再试', 'fail');
        }
      };

      // 登录
      const handleLogin = async () => {
        if (!form.mobile || !regex.isMobile(form.mobile)) {
          toast('请输入正确的手机号', 'fail');
          return;
        } else if (!form.code || !regex.isAuthCode(form.code)) {
          toast('请输入正确的验证码', 'fail');
          return;
        } else if (!form.agreement) {
          toast('请勾选同意该协议', 'fail');
          return;
        }

        const result = await login({
          mobile: form.mobile,
          auth_code: form.code
        });

        if (!result.code && result?.data) {
          const { user_id, token_type, token } = result?.data;

          Cookies.set('userId', user_id);
          Cookies.set('Authorization', `${token_type} ${token}`);

          store.commit('login/hide');
          handleClear();

          toast('登录成功', 'success', 1000);
        } else {
          toast(result?.message || '系统繁忙，请稍后再试', 'fail', 1000);
        }
      };

      return {
        visible,
        countdown,
        form,
        isActive,
        focusOn,
        handleHide,
        handleSetFocus,
        handleGetCode,
        handleLogin,
        handleClear
      };
    }
  };
</script>

<style lang="less" scoped>
  @closeBtn: 'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-common/close_modal_btn.png';

  .login-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 5px 0;
    width: 90vw;
    border-radius: 25px;
    background: #fff;
    transform: translate(-50%, -50%);
  }

  .upi-logo-wrapper {
    padding: 10px 0;
    text-align: center;

    .upi-logo {
      width: 70px;
      height: 70px;
      border-radius: 15px;
    }
  }

  .input-wrapper {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin: 0 auto 20px;
    padding: 0 10px 0 10px;
    width: 90%;
    height: 45px;
    border: 1px solid rgb(240, 240, 240);
    border-radius: 4px;
    transition: .2s linear all;

    .country-code {
      color: #969799;
      font-size: 14px;
      font-weight: 400;
    }

    .line {
      margin: 0 10px;
      width: 1px;
      height: 15px;
      background-color: #e8eaf0;
    }

    .input-item {
      width: 90%;
      height: 80%;
      border: none;
      font-size: 14px;
      outline: none;

      &::-webkit-input-placeholder {
        color: #969799;
      }

      &::-webkit-input {
        color: #969799;
      }
    }
  }

  .input-wrapper-shadow {
    box-shadow: 1px 5px 5px -5px lightgrey;
  }

  .send-code-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 25px;
    border-radius: 5px;
    background: lightcoral;
    color: #fff;
    font-size: 12px;
  }

  .agreement-check {
    display: flex;
    justify-content: center;
    margin-top: 10px;

    &-inner {
      color: #969799;
      font-size: 10px;
      font-weight: 400;

      .link {
        color: #2684fa;
      }
    }
  }

  .submit-btn {
    width: 100%;
    height: 40px;
    border-radius: 100px;
    color: #fff;
    font-size: 14px;
    font-weight: 400;
  }

  .submit-btn.isActive {
    border: none;
    background: linear-gradient(0deg, #ff3c44, #ff6f79);
    outline: none;
  }

  .submit-btn.disabled {
    border: none;
    background: lightgray;
    outline: none;
  }

  .close-btn {
    position: absolute;
    bottom: -55px;
    left: 50%;
    z-index: 11;
    width: 40px;
    height: 40px;
    background-image: url(@closeBtn);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    transform: translateX(-50%);
  }
</style>
