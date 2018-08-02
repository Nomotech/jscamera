// ============================================
// imageprocessing.js
//
// Copyright (c) 2018 Nomotech
// Released under the MIT license.
// see https://opensource.org/licenses/MIT
// ============================================

let buttonArea = document.getElementById('buttonArea')
let effectsList = document.getElementById('effectsList')
let effects = []

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
addButton('threshold', buttonArea, () => {
  addEffect('threshold', effectsList)
  effects.push((data) => threshold(data, 100))
})



// ネガポジ反転
let reversal = (data) => {
  for(let y = 0; y < HEIGHT; y++) {
    for(let x = 0; x < WIDTH; x++) {
        let index = (x + y * WIDTH) * 4
        let r = data[index + 0]
        let g = data[index + 1]
        let b = data[index + 2]
        data[index + 0] = 255 - r
        data[index + 1] = 255 - g
        data[index + 2] = 255 - b
    }
  }
}
addButton('reversal', buttonArea, () => {
  addEffect('reversal', effectsList)
  effects.push((data) => reversal(data))
})
