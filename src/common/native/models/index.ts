// 带游戏id等额外参数时以[,]作为分隔符, 多个参数时参数之间以[;]作为分隔符
// 从外部跳转: [upi://zwgamer.mobi/?type=***&id=***]

export enum Target {
  // 带游戏id等额外参数时以英文逗号「,」作为分隔符, 多个参数时参数之间以英文分号「;」作为分隔符
  // 参数名统一为 id
  'achievement' = '成就页',
  'avatar_frame' = '选择头像框',

  'cash' = '提现',
  'cash_fail' = '提现记录',
  'clean_up_cache' = '清除安装包缓存(仅在我的服务可用)',
  'common_problem' = '常见问题',
  '客服' = 'customer_service',
  'customer_service' = '客服',

  'daily_sign' = '签到',
  'day_game' = '试玩预告',
  'bulletin' = '公告', // (可带公告id)

  'feedback' = '写反馈',
  'feedback_update' = '反馈列表', // (不带时为反馈列表，带id时为反馈详情)

  '游戏详情' = 'game', // (参数为游戏id)
  'game_bundle' = '游戏合集页', // (一个参数时默认为合集id; 多个参数时以[;]分隔, 多个参数时为多个游戏id)
  'game_list' = '游戏列表(二级页面)',
  'game_trailer' = '试玩预告',

  'home' = '首页',
  'home_game_list' = '首页游戏列表',

  'invite' = '首页邀请好友',

  'littleGame' = '豹趣小游戏sdk',
  'littleH5Game' = 'H5游戏', // (南枫)
  '登录' = 'login',
  'luckpan' = '幸运转转转',

  'message' = '站内消息', // (可带id跳转消息详情)(1.0.1之后只会跳转列表页)
  'message_list' = '消息列表', // (不带参数为消息中心主页, 带参数[系统通知:system 提现通知：withdrawal 公告：notice 小秘书：assistant]时为各个子页面)
  'my_collection' = '我的收藏',

  'point_exchange' = '兑换中心',

  'settings' = '设置页面',

  'task' = '首页任务',
  'task_unclaimed' = '任务',
  'test_unclaimed' = '试玩奖励未领取', // 1个游戏时 跳转我的游戏详情 多个游戏时 跳转我的试玩内页

  'vip_center' = '会员中心'
}

// app 右上角分享配置
export interface ShareConfig {
  url: String;
  title: String;
  content: String;
  imageUrl: String;
  wechatShowImg: Boolean;
  qqShowImage: Boolean;
}

// app 图片分享配置
export interface ImageShareConfig {
  backgroundUrl: String;
  nickName: String;
  avatarUrl: String;
  text1: String;
  text2: String;
  qrCodeUrl: String;
  shareUrl: String;
}

export interface NativeModels {
  // 打开微信
  openWechat: () => void;

  // 获取客户端
  getPlatform: (callback?: any) => void;

  // 返回App版本
  appVer: () => String;

  // 返回上级
  back: () => void;

  // 关闭页面
  close: () => void;

  // 跳转到外部浏览器
  openBrowser: (url: String) => void;

  // 获取app中保存的token
  getToken: () => String;

  // 获取状态栏高度
  getStatusBarHeight: () => String;

  // 设置状态栏文字为浅色
  setLightStatusBarText: () => void;

  // app内跳转页面，传一个http的链接的话,会在新的webview中加载新的页面
  routePage: (type: Target, extra?: String) => void;

  // app在会在当前页面加载url
  loadUrl: (link: String) => void;

  // 判断是否开启了通知权限
  isNotificationEnabled: () => Boolean;

  // 跳转手机设置 - 打开通知
  notificationOpen: () => void;

  // 预加载广告视频
  initAd: () => void;

  // 打开广告视频
  showAds: () => void;

  // app - toast
  showToast: (msg: String) => void;

  // app右上角分享
  share: (shareConfig: ShareConfig) => void;

  // 特定活动图片分享（2020国庆）
  shareActivityImage: (ImageShareConfig: ImageShareConfig) => void;

  // app 设置标题和右侧图标
  setSubTitleAndIcon: (text: String, icon: String) => void;

  // app 生成二维码图片 并保存到相册
  saveQrcode: (url: String, width: number, fileName: String) => void;

  // 写入剪贴板
  copyToClipboard: (content: String) => void;

  // 读取剪贴板
  readClipboard: () => String;

  // 清空剪贴板
  clearClipboard: () => void;

  // 清空返回任务栈
  clearBackHistory: () => void;

  // 创建图片并分享
  genAndShareImage: (json: String) => void;

  // 保存图片（已存在图片链接）
  saveImage: (url: String, fileName: String) => void;

  // 保存图片（base64 图片）
  saveBase64Image: (data: String, fileName: String) => void;

  // 分享 base64 图片
  shareImageB64: (data: String) => void;

  // 设置标题文本
  setTitle: (title: String) => void;
}
