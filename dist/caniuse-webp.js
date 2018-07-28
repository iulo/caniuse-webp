(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.caniuseWebp = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.checkWebpFeature = checkWebpFeature;
  exports.default = caniuseWebp;
  // ref: https://developers.google.com/speed/webp/faq
  var features = exports.features = ['lossy', 'lossless', 'alpha', 'animation'];

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
  }

  // default check lossy
  // if no callback, will return a promise
  function caniuseWebp() {
    var feature = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';
    var callback = arguments[1];

    var result = {};
    var resolve = void 0;
    var p = void 0;

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
});
