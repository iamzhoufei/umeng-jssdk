import { createStore } from 'vuex';
export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    // 引导用户使用浏览器打开当前页面
    guideOpenBrowser: {
      namespaced: true,
      state: {
        visible: false
      },
      mutations: {
        show(state) {
          console.log('guideOpenBrowser will show', state);
          state.visible = true;
        },
        hide(state) {
          console.log('guideOpenBrowser will hide', state);
          state.visible = false;
        }
      }
    },

    // 唤端失败引导用户下载游派
    guideDownload: {
      namespaced: true,
      state: {
        visible: false,
        title: '快来下载游派吧！',
        message: '游派 | 有的玩不止于玩'
      },
      mutations: {
        show(state) {
          console.log('guideDownload will show', state);
          state.visible = true;
        },
        hide(state) {
          console.log('guideDownload will hide', state);

          state.visible = false;
        },
        reset(state) {
          console.log('guideDownload will reset', state);
          state.title = '快来下载游派吧！';
          state.message = '游派 | 有的玩不止于玩';
        },
        set(state, { title, message }) {
          console.log('guideDownload will setText', state, { title, message });
          state.title = title;
          state.message = message;
        }
      }
    },

    // 全屏 loading 状态
    loading: {
      namespaced: true,
      state: {
        visible: false
      },
      mutations: {
        show(state) {
          console.log('loading will show', state);
          state.visible = true;
        },
        hide(state) {
          console.log('loading will hide', state);
          state.visible = false;
        }
      }
    },

    // 登录弹窗
    login: {
      namespaced: true,
      state: {
        visible: false
      },
      mutations: {
        show(state) {
          console.log('login will show', state);
          state.visible = true;
        },
        hide(state) {
          console.log('login will hide', state);
          state.visible = false;
        }
      }
    }
  }
});
