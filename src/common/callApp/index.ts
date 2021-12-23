import { isInThirdPartyApp } from '@/utils';
import callApp from 'callapp-lib';

import store from '@/store';

const options = {
  scheme: {
    protocol: 'upi',
    host: 'zwgamer.mobi'
  },
  intent: {
    package: 'com.zw.youpai',
    scheme: 'upi'
  },
  timeout: 3000,
  appstore: '', // APP 的 App Store 地址
  yingyongbao: '', // APP 的应用宝地址, 如果不填写, 则安卓微信中会直接跳转 fallback
  fallback: 'https://pack.zwgamer.mobi/', // 唤端失败后跳转的地址
  logFunc: (status: 'pending' | 'failure') => {
    // 会执行两次，第一次是触发 open 方法，第二次是唤端失败，可以通过入参判断
    if (status === 'failure') {
      console.log('唤端失败');
      store.commit('loading/hide');
      // 埋点入口函数, 不管唤端成功与否，它都会被执行
      if (isInThirdPartyApp) {
        // 在 第三方app 中，唤端失败，出现 引导用户使用浏览器打开 弹窗
        store.commit('guideOpenBrowser/show');
      } else {
        // 在 浏览器 中，唤端失败，出现 引导用户下载游派 弹窗
        store.commit('guideDownload/show');
      }
    }
  }
};

const lib = new callApp(options);

export default ({ path = '', param = {}, callback = () => {} }) =>
  lib.open({ path, param, callback });
