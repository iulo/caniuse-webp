// ref: https://developers.google.com/speed/webp/faq
export const feature = {
  lossy: 'lossy',
  lossless: 'lossless',
  alpha: 'alpha',
  animation: 'animation',
}

export function checkWebpFeature(feature, callback) {
  let kTestImages = {
    feature['lossy']: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    feature['lossless']: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    feature['alpha']: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
    feature['animation']: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA'
  }
  let img = new Image()
  img.onload = function () {
    let result = (img.width > 0) && (img.height > 0)
    callback(result)
    // resolve(result)
  }
  img.onerror = function () {
    callback(false)
    // resolve(false)
  }
  img.src = 'data:image/webp;base64,' + kTestImages[feature]
}

// defalut check lossy
export default function caniuseWebp (feature = 'lossy', callback) {
  if (callback) {
    checkWebpFeature(feature, callback)
  } else {
    return new Promise(function (resolve) {
      checkWebpFeature(feature, function (result) {
        resolve(result)
      })
    })
  }
}