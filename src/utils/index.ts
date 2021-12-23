import { Toast } from 'vant';
import cookies from 'js-cookie';

import native from '@/common/native';
import call from '@/common/callApp';

import { IsLoginCallbacks, CallAppParams } from './models';
import { uniqueId } from 'lodash';

import './styles/index.less';

export const ua = navigator.userAgent;

// 判断是否在App
export const isInApp = handleIsInApp();

// 判断是否在支付宝
export const isInAlipay = ua.match(/alipay/gi);

// 判断是否在钉钉
export const isInDingTalk = ua.match(/DingTalk/gi);

// 判断是否在微博
export const isInWeibo = ua.match(/WeiBo/i);

// 判断是否在QQ
export const isInQQ = ua.match(/QQ\/[0-9]/i);

// 判断是否在微信
export const isInWechat = ua.match(/MicroMessenger\/[0-9]/i);

// 判断是否在第三方app内
export const isInThirdPartyApp = isInAlipay || isInDingTalk || isInQQ || isInWechat || isInWeibo;

// 判断是否在移动端
export const isInMobile = ua.match(/(iPhone|iPad|iPod|iOS|Android|Adr)/i);

// 判断是否在PC端
export const isInPC = !isInApp && !isInWechat && !isInQQ && !isInMobile;

// 判断是否在安卓平台
export const isAndroid = ua.match(/(Android|Adr)/i);

// 判断是否在iOS平台
export const isiOS = ua.match(/(iPhone|iPad|iPod|iOS|Mac)/i);

// 判断是否使用 Android 的移动设备打开
export const isInAndroidMobile = isAndroid && isInMobile;

// 判断是否使用 iOS 的移动设备打开
export const isIniOSMobile = isiOS && isInMobile;

// 判断是否在 pc 微信中打开
export const isInPCWechat = ua.match(/MacWechat|WindowsWechat/i);

function handleIsInApp() {
  let _isInApp = false;
  if ((window as any).android) {
    _isInApp = true;
  } else {
    if (ua.match(/(iPhone|iPad|iPod|iOS)/i)) {
      native?.getPlatform((values: any) => {
        if (values === 'iOS') {
          _isInApp = true;
        }
      });
    }
  }

  return _isInApp;
}

// px转为vw
export const px2vw = (px: number): string => `${(px / window.screen.width) * 100}vw`;

// 展示 toast
export const toast = (
  message: string,
  type?: 'fail' | 'success' | 'loading',
  duration?: number,
  onClose?: () => void
) => {
  if (isInApp) {
    native?.showToast(message);
  } else {
    if (type) {
      Toast[type]({
        message,
        className: 'toast-width',
        duration: duration ?? 2000,
        onClose
      });
    } else {
      Toast({
        message,
        className: 'toast-width',
        duration: duration ?? 2000,
        onClose
      });
    }
  }
};

/**
 * 单页应用设置页面背景颜色（包括渐变的背景颜色）
 * @param background 默认为白色背景
 */
export const setColor = (background = '#FFF') => {
  const app = document.getElementById('app') as HTMLElement;
  app.setAttribute('style', `background: ${background}`);
};

// 统一正则判断方法
export const regex = {
  urlRegex: /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,
  mobileRegex: /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[235-8]\d{2}|4(?:0\d|1[0-2]|9\d))|9[0-35-9]\d{2}|66\d{2})\d{6}$/,
  authCodeRegex: /^\d{4}(\d{2})?$/, // 判断4位或6位数字

  isUrl: (url: string) => regex.urlRegex?.test(url),
  isMobile: (mobile: string) => regex.mobileRegex?.test(mobile),
  isAuthCode: (authCode: string) => regex.authCodeRegex?.test(authCode)
};

// 对象展开为数组
export const object2Array = (object: any): Array<object> => {
  if (!object) return [];
  if (typeof object !== 'object') {
    console.error('参数必须是可遍历的对象');
    return [];
  }
  if (object instanceof Array) {
    console.error('参数必须是可遍历的对象，而不是数组');
    return [];
  }
  const array: Array<object> = [];
  let prop: string | number;
  for (prop in object) {
    const inner = {
      [prop]: object[prop]
    };
    array.push(inner);
  }
  return array;
};

export const callApp = ({ path = '' }: CallAppParams): void => {
  call({
    path: `?type=${path}`
  });
};

/**
 * 判断是否登录
 *
 * @param tokenInQuery 页面url中传递的token
 * @param callbacks 包含 处理登录状态 和 未登录状态 的回调函数 的对象，
 */
export const getIsLogin = (tokenInQuery: string, callbacks: IsLoginCallbacks) => {
  // 从 cookie 和 query 中获取 token
  const token = cookies.get('Authorization') || tokenInQuery;
  const { loggedFn, notLoggedFn } = callbacks;
  if (token) loggedFn();
  else notLoggedFn();
};

/**
 * 使用canvas进行页面截图
 *
 * @param imageNode 需要转换成canvas的img标签
 * @param containerNode 放置新生成的img标签的容器
 * @param onImageMounted 在img节点被append到容器节点之后触发的事件（一般为停止loading & 展示容器节点）
 * @param onImageClick 点击img触发的事件（一般为隐藏容器节点）
 */
export const screenshot = ({
  imageNode,
  containerNode,
  onImageMounted,
  onImageClick
}: {
  imageNode: HTMLImageElement;
  containerNode: HTMLElement;
  onImageMounted: Function;
  onImageClick: Function;
}) => {
  imageNode.id = `image_node_${uniqueId()}`;
  imageNode.style.position = 'absolute';
  imageNode.style.top = '0';
  imageNode.style.left = '0';
  imageNode.style.right = '0';
  imageNode.style.bottom = '0';
  imageNode.style.margin = 'auto';
  imageNode.style.zIndex = '2';
  imageNode.style.borderWidth = '5px';
  imageNode.style.borderColor = '#fff';
  imageNode.style.borderStyle = 'solid';
  imageNode.style.width = '85vw';
  // imageNode.style.height = '85vh';
  imageNode.style.objectFit = 'contain';
  imageNode.style.background = 'transparent';
  // img.style.transform = `scale(${1 / window.devicePixelRatio})`;
  imageNode.onclick = () => {
    containerNode?.removeChild(imageNode);
    onImageClick();
  };

  containerNode?.appendChild(imageNode);
  onImageMounted();

  if (isInApp) {
    setTimeout(() => {
      native.shareImageB64(imageNode.src);
    }, 700);
  }
};

/**
 *
 * @param value 任意数值
 * @param count 需要保留的小数位数，大于0
 * @returns { string }
 */
export const toFixed = function (value: number, count: number): string {
  const reg = new RegExp(`(\\d+\\.?\\d{0,${count}})[\\.\\d]*`);
  /**
      拼接.00是考虑入参是整数的情况  拼接0是考虑入参是一位小数的情况

      保留两位小数的情况
      1 ----> 1.00-------> 1.00 + 0 -----------------> 1.00
      1.1---> 1.1.00-----> 1.1  + 0 -----------------> 1.10
      1.11--> 1.11.00----> 1.11 + 0 -----------------> 1.11
      1.123-> 1.123.00---> 1.12 + 0 -----------------> 1.12
   */
  return (value + '.' + '0'.repeat(count))
    .replace(reg, '$1' + '0'.repeat(count - 1))
    .replace(reg, '$1');
};

/**
 * 统一处理未登录的情况
 *
 * @param allowThirdParty 是否允许登录之后在第三方app中参加活动，默认值为 false
 * @param allowBrowser 是否允许登录之后在手机浏览器中参加活动，默认值为 false
 * @param link 当前页面的链接
 */
// export const handleNotLogin = ({
//   allowThirdParty = false,
//   allowBrowser = false,
//   link = location?.href,
// }: {
//   allowThirdParty?: boolean;
//   allowBrowser?: boolean;
//   link?: string;
// }) => {
//   if (isInApp) {
//     // 在 app 中
//     native.routePage('login', '');
//   } else if ((isInQQ || isInWechat) && isInMobile) {
//     // 在移动端的 QQ 或者 微信中
//     if (allowThirdParty) {
//       // 允许在第三方app中登录后参加活动 => 唤起 登录弹窗
//     } else {
//       // 必须到 app 中参加活动 => 唤起 引导用户使用浏览器打开当前页面弹窗
//     }
//   } else if (isInMobile) {
//     // 在手机浏览器中
//     if (allowBrowser) {
//       // 允许在浏览器中登录后参加活动 => 唤起 登录弹窗
//     } else {
//       // 必须到 app 中参加活动 => 尝试唤起 app 并进入活动页面
//       callAppWebView({ link });
//     }
//   }
// };
