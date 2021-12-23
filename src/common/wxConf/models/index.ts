export interface WechatShareInfo {
  title: string;
  desc: string;
  link: string;
  imgUrl: string;
  success?: () => void;
}

export interface WechatShareConfig {
  appId: string;
  beta: boolean;
  debug: boolean;
  jsApiList: string[];
  nonceStr: string;
  signature: string;
  timestamp: number;
  url: string;
}
