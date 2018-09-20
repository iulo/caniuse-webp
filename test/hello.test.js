const path = require('path')
const app = require('../lib/caniuse-webp')
// const app = require('../dist/caniuse-webp')
const caniuseWebp = app.default


// describe('test caniuseWebp promise api', () => {
//   let p
//   beforeAll(() => {
//     // p = caniuseWebp()
//     // return p
//   })

//   test('1+1=2', () => {
//     expect(1+1).toBe(2)
//   })

//   // test('caniuseWebp() should return promise', () => {
//   //   expect(caniuseWebp()).toBeInstanceOf(Promise)
//   // })
  
//   test('caniuseWebp() should resolve an object', async () => {
//     // expect.assertions(1)
//     document.body.innerHTML = '<div></div>'
//     const o = await caniuseWebp()
//     console.log(o)
//     expect(o).toBeInstanceOf(Object)
//   })
// })

describe('Google', () => {
  const htmlPath = path.resolve('example/index.html').replace(/\\/g, '/')

  beforeAll(async () => {
    await page.goto(`file://${htmlPath}`)
  })

  // test('should display "google" text on page', async () => {
  //   await expect(page).toMatch('google')
  // })

  test('should display "webp" text on page', async () => {
    await expect(page).toMatch('webp')
  })

  test('test dir', () => {
    expect(1+1).toBe(2)
  })
})
