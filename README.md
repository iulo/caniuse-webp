## install
`npm i caniuse-webp`


## usage
```js
import caniuseWebp from 'caniuse-webp'

const isSupported = caniuseWebp()
// return {
//   lossy: true,
//   lossless: true,
//   alpha: true,
//   animation: true,
// }

const isSupportedWebpLossy = caniuseWebp('lossy')
// return true


```

## Api
### caniuseWebp

can check `lossy`、`lossless`、`alpha`、`animation`

