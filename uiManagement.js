// ============================================
// uimanagement.js
//
// Copyright (c) 2018 Nomotech
// Released under the MIT license.
// see https://opensource.org/licenses/MIT
// ============================================

let addButton = (str, element, callback) => {
  let btn = document.createElement('button')
  btn.textContent = str
  btn.classList.add('btn', 'btn-outline-info')
  btn.setAttribute('id', str)
  element.appendChild(btn)
  btn.onclick = callback
}

let addEffect = (str, element) => {
  let btn = document.createElement('button')
  btn.textContent = '✕'
  btn.classList.add('close')
  btn.setAttribute('id', str)
  btn.setAttribute('aria-hidden', 'true')
  element.appendChild(btn)
  btn.onclick = () => {

  }

  let eff = document.createElement('div')
  eff.textContent = str
  eff.classList.add('effect', 'alert', 'alert-warning', 'alert-dismissible', 'show')
  eff.setAttribute('role', 'alert')
  eff.setAttribute('id', str)
  eff.appendChild(btn)
  element.appendChild(eff)
}
