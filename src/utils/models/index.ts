export interface IsLoginCallbacks {
  loggedFn: () => void;
  notLoggedFn: () => void;
}
export interface AppShareParams {
  title: string;
  text: string;
  link: string;
  image: string;
}

export interface CallAppParams {
  inviteId?: string; // 邀请下载用户的id
  source?: string; // 下载链接的来源
  link?: string; // callAppWebview
  path?: string; // callApp
  query?: string;
  title?: string;
  message?: string;
  cancelText?: string;
  cancelFn?: () => void;
  confirmText?: string;
  confirmFn?: () => void;
}

export interface Error {
  code: number;
  errorCode: string;
  errorMessage: string;
}
