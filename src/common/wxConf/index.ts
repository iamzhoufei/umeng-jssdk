import { isInWechat, toast } from '@/utils';

import { WechatShareConfig, WechatShareInfo } from '@/common/wxConf/models';
import { getWechatShareConfig } from '@/common/wxConf/services';

const { wx } = window as any;

const wechatConfig = async (shareInfo: WechatShareInfo) => {
  if (isInWechat) {
    try {
      const result = await getWechatShareConfig({
        url: window.location.href.split('#')[0]
      });

      if (!result?.code && result?.data) {
        const { data } = result;

        const { appId, nonceStr, signature, timestamp, jsApiList }: WechatShareConfig = data;

        const { title, desc, link, imgUrl, success } = shareInfo;

        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId, // 必填，公众号的唯一标识
          timestamp, // 必填，生成签名的时间戳
          nonceStr, // 必填，生成签名的随机串
          signature, // 必填，签名
          jsApiList // 必填，需要使用的JS接口列表
          // ...data
        });

        wx.ready(() => {
          console.log('====ready===');
          // “分享给朋友”及“分享到QQ”
          wx.updateAppMessageShareData({
            title, // 分享标题
            desc, // 分享描述
            link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl, // 分享图标
            success:
              success ||
              function () {
                // 设置成功
                console.log('updateAppMessageShareData: set ok');
              }
          });

          // “分享到朋友圈”及“分享到QQ空间”
          wx.updateTimelineShareData({
            title, // 分享标题
            link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl, // 分享图标
            success:
              success ||
              function () {
                // 设置成功
                console.log('updateTimelineShareData: set ok');
              }
          });

          // 旧版: 分享给朋友
          wx.onMenuShareAppMessage({
            title, // 分享标题
            desc, // 分享描述
            link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success:
              success ||
              function () {
                console.log('onMenuShareAppMessage: set ok');
                // 用户点击了分享后执行的回调函数
              }
          });
        });

        wx.error(function () {
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，
          // 也可以在返回的res参数中查看，对于spa可以在这里更新签名

          console.log('====验证失败===');
        });
      } else {
        toast(result?.message, 'fail');
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export default wechatConfig;
