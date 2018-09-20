/*!
 * caniuse-webp.js v0.0.2
 * (c) 2018-present kxd-feteam
 * Released under the MIT License.
 */
// ref: https://developers.google.com/speed/webp/faq
var features = ['lossy', 'lossless', 'alpha', 'animation'];
function checkWebpFeature(feature, callback) {
  var kTestImages = {
    lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    alpha: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
    animation: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
    all: true
  };
  var img = new Image();

  img.onload = function () {
    var result = img.width > 0 && img.height > 0;
    callback(result);
  };

  img.onerror = function () {
    callback(false);
  };

  img.src = 'data:image/webp;base64,' + kTestImages[feature];
} // default check lossy
// if no callback, will return a promise

function caniuseWebp(feature, callback) {
  if (feature === void 0) {
    feature = 'all';
  }

  var result = {};
  var resolve;
  var p;

  if (!callback) {
    p = new Promise(function (_resolve) {
      resolve = _resolve;
    });
  } else {
    console.log('callback');

    resolve = function resolve(res) {
      callback(res);
    };
  }

  if (feature === 'all') {
    features.forEach(function (feat, index) {
      checkWebpFeature(feat, function (res) {
        result[feat] = res;
        ++index;

        if (index === features.length) {
          // all done
          resolve(result);
        }
      });
    });
  } else {
    checkWebpFeature(feature, resolve);
  }

  if (!callback) return p;
}

export default caniuseWebp;
export { features, checkWebpFeature };
//# sourceMappingURL=caniuse-webp.esm.js.map
