

const trackEvents = {
  // iOS 引导下载页面 - 访问次数
    iOSGuideDownloadView() {
        ((window as any)?._czc).push(['_trackEvent', 'iOS 引导下载页面', '访问']);
    },

  // Android 引导下载页面 - 访问次数
    AndroidGuideDownloadView() {
        ((window as any)?._czc).push(['_trackEvent', 'Android 引导下载页面', '访问']);
    },

  // Android 引导下载页面 - 点击下载次数
    AndroidGuideDownloadClick() {
        ((window as any)?._czc).push(['_trackEvent', 'Android 引导下载页面', '点击下载']);
    },
};

export default trackEvents;