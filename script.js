// ============================================
// script.js
//
// Copyright (c) 2018 Nomotech
// Released under the MIT license.
// see https://opensource.org/licenses/MIT
// ============================================

const WIDTH  = 640
const HEIGHT = 480

// 一度画像を取り込むcanvas
const dataCanvas = document.createElement('canvas')
dataCanvas.width = WIDTH
dataCanvas.height = HEIGHT
const dataCtx = dataCanvas.getContext('2d')

// 出力用のcanvas
const canvas = document.getElementById('canvas')
canvas.width = WIDTH
canvas.height = HEIGHT
const ctx = canvas.getContext('2d')
console.clear();

// -------------------------< cameraの処理 >-------------------------
let video = document.getElementById('camera');
let localMediaStream = null;
let hasGetUserMedia = () => {
  return (navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);
};

let onFailSoHard = (e) => {
  console.log('error', e);
};

if(!hasGetUserMedia()) {
  alert("未対応です。");
} else {
  window.URL = window.URL || window.webkitURL;
  navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  navigator.getUserMedia({video: true}, (stream) => {
    video.src = window.URL.createObjectURL(stream);
    localMediaStream = stream;
  }, onFailSoHard);
}


// -------------------------< Image processing >-------------------------
// 画像の二値化 data ... image data t ... threshold
let threshold = (data, t) => {
  for(let y = 0; y < HEIGHT; y++) {
    for(let x = 0; x < WIDTH; x++) {
        let index = (x + y * WIDTH) * 4
        let r = data[index + 0]
        let g = data[index + 1]
        let b = data[index + 2]
        let v = r * 0.298912 + g * 0.586611 + b * 0.114478
        if(v > t)    data[index + 0] = data[index + 1] = data[index + 2] = 255
        else         data[index + 0] = data[index + 1] = data[index + 2] = 0
    }
  }
}


// -------------------------< 画像をcanvasに >-------------------------

let imageData
let loop = () => {
  dataCtx.drawImage(video, 0, 0, WIDTH, HEIGHT)          // 一度canvasに焼き付けてそのcanvasから画像データを取り出す
  imageData = dataCtx.getImageData(0, 0, WIDTH, HEIGHT)

  // 画像処理
  threshold(imageData.data, 100)

  ctx.save()
  ctx.globalAlpha = 1
  ctx.putImageData(imageData, 0, 0)  // 画像データを出力用のcanvasに
  ctx.restore();
  requestAnimationFrame(loop)
}
loop()
