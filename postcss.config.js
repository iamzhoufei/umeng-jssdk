module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'not ie <= 11', //不考虑IE浏览器
        'ff >= 30', //仅新版本用“ff>=30
        '> 1%', //  全球统计有超过1%的使用率使用“>1%”;
        'last 2 versions' // 所有主流浏览器最近2个版本
      ],
      grid: true // 开启grid布局的兼容(浏览器IE除外其他都能兼容grid，可以关闭开启)
    },
    // 'postcss-pxtorem': {
    //   rootValue: 37.5, // 换算的基数(设计图750的根字体为32)
    //   selectorBlackList: ['.no-rem', 'no-rem'], // 要忽略的选择器并保留为px。
    //   propList: ['*'], //可以从px更改为rem的属性。
    //   minPixelValue: 2, // 设置要替换的最小像素值。
    // },
    'postcss-px-to-viewport': {
      unitToConvert: 'px', //需要转换的单位，默认为"px"
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 1334, //视窗的高度，根据375设备的宽度来指定，一般指定667，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      propList: ['*'], // 能转化为vw的属性列表
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      fontViewportUnit: 'vw', //字体使用的视口单位
      selectorBlackList: ['.ignore-'], //指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
      replace: true, //是否直接更换属性值，而不添加备用属性
      exclude: [/node_modules/], //忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
      landscape: false, //是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
      landscapeUnit: 'vw', //横屏时使用的单位
      landscapeWidth: 1134 //横屏时使用的视口宽度
    }
  }
};
