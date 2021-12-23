import { isAndroid } from '@/utils';
import { ImageShareConfig, NativeModels, ShareConfig } from './models';

interface IiOSCallHandler {
  method: string;
  params?: IParams;
  callback?: (data: any) => void;
}

interface IParams {
  [key: string]: any;
}

const iOSCallHandler = ({ method, params, callback }: IiOSCallHandler) => {
  (window as any)?.setupWebViewJavascriptBridge?.((bridge: any) =>
    bridge.callHandler(method, params, callback)
  );
};

const Native: NativeModels = {
  getToken: () => (window as any).android?.getToken(),

  getPlatform(callback?: any) {
    return iOSCallHandler({ method: 'getPlatform', callback });
  },

  isNotificationEnabled: () => (window as any).android?.isNotificationEnabled(),

  readClipboard: () => (window as any).android?.readClipboard(),

  back() {
    return isAndroid ? (window as any).android?.back() : iOSCallHandler({ method: 'back' });
  },

  openWechat() {
    (window as any).android?.openWechat();
  },

  setLightStatusBarText() {
    (window as any).android?.setLightStatusBarText();
  },

  setTitle(title) {
    (window as any).android?.setTitle(title);
  },

  openBrowser(url) {
    (window as any).android?.openBrowser(url);
  },

  initAd() {
    (window as any).android?.initAd();
  },

  showAds() {
    (window as any).android?.showAds();
  },

  showToast(message) {
    (window as any).android?.showToast(message);
  },

  routePage(type, extra) {
    (window as any).android?.routePage(type, extra);
  },

  loadUrl(url) {
    (window as any).android?.loadUrl(url);
  },

  share(shareConfig: ShareConfig) {
    (window as any).android?.share(
      shareConfig?.url,
      shareConfig?.title,
      shareConfig?.content,
      shareConfig?.imageUrl,
      shareConfig?.wechatShowImg,
      shareConfig?.qqShowImage
    );
  },

  shareActivityImage(imageShareConfig: ImageShareConfig) {
    (window as any).android?.shareActivityImage(
      imageShareConfig?.backgroundUrl,
      imageShareConfig?.nickName,
      imageShareConfig?.avatarUrl,
      imageShareConfig?.text1,
      imageShareConfig?.text2,
      imageShareConfig?.qrCodeUrl,
      imageShareConfig?.shareUrl
    );
  },

  notificationOpen() {
    (window as any).android?.openNotification();
  },

  setSubTitleAndIcon(subTitle, icon) {
    (window as any).android?.setSubTitleAndIcon(subTitle, icon);
  },

  saveQrcode(url, width, fileName) {
    (window as any).android?.saveQrcode(url, width, fileName);
  },

  copyToClipboard(content) {
    (window as any).android?.copyToClipboard(content);
  },

  clearClipboard() {
    (window as any).android?.clearClipboard();
  },

  close() {
    (window as any).android?.close();
  },

  clearBackHistory() {
    (window as any).android?.clearBackHistory();
  },

  genAndShareImage(json) {
    (window as any).android?.genAndShareImage(json);
  },

  saveImage(url, fileName) {
    (window as any).android?.saveImage(url, fileName);
  },

  saveBase64Image(data, fileName) {
    (window as any).android?.saveImageB64(data, fileName);
  },

  shareImageB64(data) {
    (window as any).android?.shareImageB64(data);
  },

  appVer() {
    return (window as any).android?.appVer();
  },

  getStatusBarHeight() {
    return (window as any).android?.getStatusBarHeight();
  }
};

export default Native;
