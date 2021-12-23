import html2canvas from 'html2canvas';
import canvas2Image from './canvas2image';

/**
 * 根据window.devicePixelRatio获取像素比
 */
function DPR() {
  if (window.devicePixelRatio && window.devicePixelRatio > 1) {
    return window.devicePixelRatio;
  }
  return 1;
}

/**
 *  将传入值转为整数
 */
function parseValue(value: string) {
  return parseInt(value, 10);
}

/**
 * 创建用于绘制的基础canvas画布
 */
function createBaseCanvas(scale: number, width: number, height: number) {
  const canvas = document.createElement('canvas');

  console.log(`scale: ${scale}`);
  canvas.width = width * scale;
  canvas.height = height * scale;

  console.log(`width: ${width}`);
  console.log(`height: ${height}`);

  console.log(`canvas.width: ${canvas.width}`);
  console.log(`canvas.height: ${canvas.height}`);

  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  // 关闭抗锯齿
  // context.mozImageSmoothingEnabled = false;
  // context.webkitImageSmoothingEnabled = false;
  // context.msImageSmoothingEnabled = false;
  context.imageSmoothingEnabled = false;

  // context.scale(0.5 * scale, 0.5 * scale);

  return canvas;
}

/**
 * 将这个 DOM 节点转换成图片并返回
 * @param selector 想要转换的 DOM 节点
 */
const drawCanvasImage = (selectorNode: HTMLElement) => {
  const box = window.getComputedStyle(selectorNode);

  console.log('box.width');
  console.log(box.width);

  // DOM 节点计算后宽高
  const width = selectorNode.offsetWidth;
  const height = selectorNode.offsetHeight;

  // 获取像素比
  const scale = DPR();

  // 创建自定义 canvas 元素
  const canvas = createBaseCanvas(scale, width, height);

  // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
  // canvas.width = width * scale;
  // canvas.height = height * scale;

  // 设定 canvas css宽高为 DOM 节点宽高
  // canvas.style.width = `${width}px`;
  // canvas.style.height = `${height}px`;

  // canvas.style.transform = `scale(${1 / scale})`;

  // 获取画笔
  // const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  // 关闭抗锯齿
  // context.mozImageSmoothingEnabled = false;
  // context.webkitImageSmoothingEnabled = false;
  // context.msImageSmoothingEnabled = false;
  // context.imageSmoothingEnabled = false;

  // 将所有绘制内容放大像素比倍
  // context.scale(scale, scale);

  const options = {
    scale,
    width,
    height,
    canvas,
    useCORS: true,
    allowTaint: false
  };

  // 将自定义 canvas 作为配置项传入，开始绘制
  return html2canvas(selectorNode, options)
    .then((canvas) => canvas2Image.convertToPNG(canvas, canvas.width, canvas.height))
    .catch((error) => console.log('html2canvas error: ', error));
};

export default drawCanvasImage;
