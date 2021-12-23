/* eslint-disable @typescript-eslint/no-namespace */
// 全局可用的类型
export namespace Login {
  export interface Params {
    mobile: string;
    auth_code: string;
    identification?: string;
    events?: Event[];
  }

  export interface GetCodeParams {
    mobile: string;
    captcha_key?: string;
    captcha_code?: string;
  }

  export interface Event {
    type: string;
    key: string;
  }
}

export namespace API {
  export interface Response {
    code: number;
    message: string;
    data: any;
  }
}

export enum ErrorCode {
  '登录状态已失效' = -200001,
  '操作失败' = 100001,
  '操作受限' = 100002,
  '请求异常' = 400001,
  '认证失败' = 401001,
  '数据无权限访问' = 403001,
  '表单验证失败' = 422001,
  '资源不存在' = 404001,
  '资源状态已改变' = 404002,
  '资源被锁定' = 423001,
  '请求过快' = 429001,
  '请求过快, 需要验证' = 429002,
  '内部错误' = 500001,
  '配置错误' = 500002
}
