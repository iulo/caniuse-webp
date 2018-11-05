## install
`npm i caniuse-webp`


## usage
```js
import caniuseWebp from 'caniuse-webp'

;(async function () {
  const isSupported = await caniuseWebp()
  // return {
  //   lossy: true,
  //   lossless: true,
  //   alpha: true,
  //   animation: true,
  // }

  const isSupportedWebpLossy = await caniuseWebp('lossy')
  // return true
})()


```

## Api
### caniuseWebp

can check `lossy`、`lossless`、`alpha`、`animation`

