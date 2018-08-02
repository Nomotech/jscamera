// ============================================
// script.js
//
// Copyright (c) 2018 Nomotech
// Released under the MIT license.
// see https://opensource.org/licenses/MIT
// ============================================

const WIDTH  = 640/2
const HEIGHT = 480/2

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

// -------------------------< cameraの準備 >-------------------------
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

// -------------------------< 画像処理をするloop処理 >-------------------------
let imageData
let loop = () => {
  dataCtx.drawImage(video, 0, 0, WIDTH, HEIGHT)          // 一度canvasに焼き付けてそのcanvasから画像データを取り出す
  imageData = dataCtx.getImageData(0, 0, WIDTH, HEIGHT)

  // 画像処理
  for (let eff of effects) eff(imageData.data)

  ctx.save()
  ctx.globalAlpha = 1
  ctx.putImageData(imageData, 0, 0)  // 画像データを出力用のcanvasに
  ctx.restore();
  requestAnimationFrame(loop)
}

window.onload = () => {
	loop()
};
