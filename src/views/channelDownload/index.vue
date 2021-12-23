<template>
  <div class="wrapper">
    <div class="records">
      <marquee-view>
        <template #record>
          <swiper-slide v-for="(item, index) in records" :key="`chinajoy_${Number(index)}`">
            <div class="record">
              <avatar-view :avatar="item?.avatar" :frame="item?.frame" />
              <span>{{ item?.nick }}获得{{ item?.coin }}金币！</span>
            </div>
          </swiper-slide>
        </template>
      </marquee-view>
    </div>

    <img class="title" :src="downloadTitle" />
    <div class="sub-title">游派｜有的玩不止于玩</div>

    <div class="iOS-install-steps-wrapper">
      <div id="iOS-download-btn" class="iOS-download-btn" @click="handleDownloadiOS"></div>
      <div class="steps">
        <div class="step-title">iOS安装流程</div>
        <div class="sub-title">1、点击上方「立即下载」按钮，按提示操作</div>
        <img class="step-image" :src="iOSSteps[0]" />
        <div class="sub-title">2、安装「TestFlight」</div>
        <div class="sub-descption">
          在新页面中，点击第一步按钮，下载并安装TestFlight（已安装则忽略此步）。
        </div>
        <img class="step-image" :src="iOSSteps[1]" />
        <div class="sub-descption" style="color: #fd1100">
          *如果下载TestFlight后跳转显示“无法查询到可用APP”，请清理掉下载页面以及TestFlight后台，重新扫码进入下载页面，直接进行第2步即可正常下载。
        </div>
        <div class="sub-title">3、点击「开始测试」</div>
        <div class="sub-descption">
          安装好TestFlight之后，点击页面第二步中的「开始测试」按钮，按照引导操作。
        </div>
        <img class="step-image" :src="iOSSteps[2]" />
        <div class="sub-title">4、安装「jones78」，即可体验</div>
        <div class="sub-descption"> 点击安装「jones78」，安装完成后，点击打开即可体验游派。 </div>
        <img class="step-image" :src="iOSSteps[3]" />
        <!-- <div class="open-upi-btn"></div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import qs from 'qs';

  import { useStore } from 'vuex';

  import trackEvents from '@/common/trackEvents';
  import { isIniOSMobile, setColor } from '@/utils';

  import { SwiperSlide } from 'swiper/vue';

  import 'swiper/swiper.less';
  import 'swiper/components/effect-cube/effect-cube.less';

  import MarqueeView from '@/components/marquee.vue';
  import AvatarView from '@/components/avatar.vue';

  // install Swiper modules
  // SwiperCore.use([Autoplay]);

  export default {
    name: 'DownloadView',
    components: {
      // Swiper,
      SwiperSlide,
      // HeaderView,
      AvatarView,
      MarqueeView
    },

    setup() {
      const invitor_id = (qs.parse(window.location.href.split('?')[1])?.id ?? '') as string;

      const phone =
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-static/download/phone.png';
      const downloadTitle =
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-static/download/download_title.png';
      const iOSBackground =
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-static/download/ios_download.png';

      const avatars = [
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-common/avatars/20191114233952_xBvi2.thumb.700_0.jpeg',
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-common/avatars/20200330100124_Gmzsw.thumb.700_0.jpeg',
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-common/avatars/20200402010529_rcsin.thumb.700_0.jpg',
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-common/avatars/20200816175642_19f84.thumb.700_0.jpeg',
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-common/avatars/20201018084025_cpjpo.thumb.700_0.jpg',
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-common/avatars/20201226174034_efd47.thumb.700_0.jpg',
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-common/avatars/20200715130930_jmeep.jpg',
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-common/avatars/20201116192527_20e1a.jpeg'
      ];

      const frames = [
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-common/frames/frame_1.png',
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-common/frames/frame_2.png',
        ''
      ];

      // iOS安装步骤
      const iOSSteps = [
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-static/download/first_step.jpg',
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-static/download/second_step.jpg',
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-static/download/third_step.jpg',
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-static/download/fourth_step.jpg'
      ];

      const nicks = [
        '*战无*',
        '*修修*',
        '*迷上*',
        '*梦我*',
        '*跑快*',
        '*哈哈*',
        '*饭吃*',
        '*傲九*'
      ];

      const coins = ['82200', '69200', '34200', '31900', '98200', '42300', '61200', '90100'];

      const store = useStore();

      const records = ref(
        avatars.map((item, index) => ({
          avatar: avatars[index],
          frame: frames[Math.floor(Math.random() * 3)],
          nick: nicks[index],
          coin: coins[index]
        }))
      );

      const registerInfo = reactive({
        key: '',
        mobile: '',
        messageCode: '',
        graphCode: '',
        graphCodeImage: '',
        agreement: false
      });

      function proxyOpenDownloadfn(defaultAction, cctx) {
        debugger;
      }

      onMounted(() => {
        console.log(window.ULink);
        (window as any)?.ULink({
          id: 'usr1n3e43gdsmfrf', // 后台生成的裂变活动LinkID
          data: {
            // 传递的自定义动态参数
            channel_id: ''
          },
          selector: '#iOS-download-btn', //按钮的名称
          // 可选高级功能，具体含义请看下方U-Link API文档
          auto: false,
          timeout: 2000,
          lazy: false,
          proxyOpenDownload: (defaultAction, LinkInstance) => {
            if ((window as any)?.ULink.isWechat || (window as any)?.ULink.isQQ) {
              console.log(`(window as any)?.ULink.isWechat: ${(window as any)?.ULink.isWechat}`);
              // 在qq或者微信环境执行内置逻辑，具体内置逻辑为:当设置了useOpenInBrowerTips字段时，qq&&微信&&scheme时，启用蒙层提示去浏览器打开
              defaultAction();
            } else {
              window.location.href = LinkInstance.solution.downloadUrl;
            }
          },
          useOpenInBrowerTips: function (ctx) {
            return '<div style="position:fixed;left:0;top:0;background:rgba(255,0,255,0.5);width:100%;height:100%;z-index:19910324;"></div>';
          }
          // proxyOpenDownload: function (defaultAction, LinkInstance) {
          //   if ((window as any)?.ULink.isWechat || (window as any)?.ULink.isQQ) {
          //     // 在qq或者微信环境执行内置逻辑，具体内置逻辑为:当设置了useOpenInBrowerTips字段时，qq&&微信&&scheme时，启用蒙层提示去浏览器打开
          //     defaultAction();
          //     return;
          //   }
          //   if (LinkInstance.solution.type === 'universalLink') {
          //     location.href = 'https://testflight.apple.com/join/lJXJ9sft';
          //     // universalLink 唤起应当由服务端提供一个带重定向到appstore的universallink地址。因此，此处不应写逻辑，友盟已于6月2日上线universalLink生成及重定向功能。
          //   }
          // }
        });
        setColor('#fca843');
        // 埋点
        if (isIniOSMobile) {
          trackEvents.iOSGuideDownloadView();
        }
      });

      // 展示 用浏览器打开当前页面 弹窗
      const handleShowGuideOpenBrowser = () => store.commit('guideOpenBrowser/show');

      const handleDownloadiOS = () => {
        alert('handleDownloadiOS');
        // location.href = 'https://testflight.apple.com/join/lJXJ9sft';
      };

      return {
        phone,
        downloadTitle,
        iOSBackground,
        iOSSteps,

        isIniOSMobile,

        records,
        registerInfo,

        handleShowGuideOpenBrowser,
        handleDownloadiOS
      };
    }
  };
</script>

<style lang="less" scoped>
  @background: 'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-static/download/background.png';
  @openUpiBtn: 'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-static/download/open_upi_btn.png';
  @openByBroswer: 'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-static/download/open_by_broswer.png';

  // iOS下载按钮
  @iOSDownloadBtn: 'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-static/download/iOS_download.png';

  .wrapper {
    position: relative;
    width: 375px;
    min-height: 667px;
    overflow: hidden;
    background-color: #fdab43;
    background-image: url(@background);
    background-repeat: no-repeat;
    background-position: top center;
    background-size: contain;
    text-align: center;

    .records {
      padding-top: 20px;

      .record {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 210px;
        height: 25px;
        border-radius: 15px;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
        font-size: 12px;
        line-height: 25px;
        text-align: left;
      }
    }

    .title {
      margin: 10px 0;
      width: 231px;
      height: 40px;
    }

    .sub-title {
      color: #fff;
      font-size: 12px;
      font-weight: 500;
    }
  }

  .iOS-install-steps-wrapper {
    padding-bottom: 20px;
    .iOS-download-btn {
      margin: 25px auto;
      width: 220px;
      height: 43px;
      background-image: url(@iOSDownloadBtn);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }

    .steps {
      margin: 0 auto;
      padding: 10px 20px;
      min-height: 300px;
      width: 300px;
      border-radius: 15px;
      box-shadow: 0 0 10px -3px grey;
      background-color: #fff;
      text-align: left;

      .step-title {
        text-align: center;
        margin: 10px 0 20px;
        color: #fb5533;
        font-size: 18px;
        font-weight: 600;
        font-family: ZhenyanGB;
        letter-spacing: 2px;
      }

      .sub-title {
        margin-top: 20px;
        color: #333;
        font-size: 14px;
      }

      .sub-descption {
        margin: 5px 0;
        color: #959595;
        font-size: 11px;
      }

      .step-image {
        width: 100%;
        height: auto;
        margin-top: 20px;
      }
    }

    .open-by-broswer {
      position: fixed;
      top: 20px;
      right: 50px;
      width: 208px;
      height: 95px;
      background-image: url(@openByBroswer);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
  }
</style>
