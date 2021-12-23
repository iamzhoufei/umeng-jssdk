import { request } from '@/common/http';
// import request from '@/common/request';

interface Response {
  code: number;
  message: string;
  data: any;
}

// 获取微信分享配置
export const getWechatShareConfig = (data: { url: string }): Response =>
  request('/v2/wechat/share', {
    method: 'GET',
    data
  });

// 埋点
export const sendPvFrom = (data: { referer: string }): Response =>
  request('/v2/webstat/pv', {
    method: 'POST',
    data
  });
