// 全局可用的接口

import { request } from '@/common/http';
import { Login, API } from '@/models';

// 手机号 + 验证码 登录
export const login = (data: Login.Params): API.Response =>
  request('/v2/auth/sms/login', {
    method: 'POST',
    data
  });

// 发送验证码
export const sendCode = (data: Login.GetCodeParams): API.Response =>
  request('/v2/auth/sms/sendcode', {
    method: 'POST',
    data
  });
