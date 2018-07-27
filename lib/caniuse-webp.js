// ref: https://developers.google.com/speed/webp/faq
export const features = [
  'lossy',
  'lossless',
  'alpha',
  'animation',
]

export function checkWebpFeature(feature, callback) {
  let kTestImages = {
    lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    alpha: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
    animation: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
    all: true
  }
  let img = new Image()
  img.onload = function () {
    let result = (img.width > 0) && (img.height > 0)
    callback(result)
  }
  img.onerror = function () {
    callback(false)
  }
  img.src = 'data:image/webp;base64,' + kTestImages[feature]
}



// default check lossy
// if no callback, will return a promise
export default function caniuseWebp (feature = 'all', callback) {
  let result = {}
  let resolve
  let p

  if (!callback) {
    p = new Promise(function (_resolve) {
      resolve = _resolve
    })
  } else {
    console.log('callback')
    resolve = function (res) {
      callback(res)
    }
  }
  
  if (feature === 'all') { 
    features.forEach((feat, index) => {
      checkWebpFeature(feat, function (res) {
        result[feat] = res
        ++index
        if (index === features.length) {
          // all done
          resolve(result)
        }
      })
    })
  } else {
    checkWebpFeature(feat, resolve)
  }

  if (!callback) return p
}