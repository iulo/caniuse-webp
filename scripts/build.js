const path = require('path')
const rollup = require('rollup')
const replace = require('rollup-plugin-replace')
const { uglify } = require('rollup-plugin-uglify')
const visualizer = require('rollup-plugin-visualizer')
const filesize = require('rollup-plugin-filesize')
const nodeResolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const _ = require('lodash')
const pkg = require('../package.json')
const { version, name: pkgName } = pkg
const cwd = process.cwd()

const banner = 
'/*!\n' +
' * ' + pkgName + '.js v' + version + '\n' +
' * (c) 2018-present' + ' kxd-feteam\n' +
' * Released under the MIT License.\n' +
' */'

function distPath (target) {
  return path.join(cwd, target)
}

const ugf = uglify({
  compress: {
    drop_console: true
  }
})

const builds = {
  'es': {
    entry: distPath('lib/index.js'),
    dest: distPath(`dist/${pkgName}.esm.js`),
    format: 'es'
  },
  'cjs': {
    entry: distPath('lib/index.js'),
    dest: distPath(`dist/${pkgName}.common.js`),
    format: 'cjs'
  },
  'umd': {
    entry: distPath('lib/index.js'),
    dest: distPath(`dist/${pkgName}.min.js`),
    format: 'umd',
    plugins: [
      ugf
    ]
  }
}

function genConfig (type) {
  const opts = builds[type]
  const plugins = [
    replace({
      __VERSION__: version
    }),
    nodeResolve(),
    filesize(),
    babel({
      // babelrc: false,
      exclude: 'node_modules/**'
    })
  ].concat(opts.plugins || [])

  return {
    input: opts.entry,
    plugins,
    output: {
      file: opts.dest,
      format: opts.format,
      banner,
      exports: 'named',
      sourcemap: true,
      name: 'caniuseWebp'
    }
  }
}

async function buildEntry (config) {
  const output = config.output
  const bundle = await rollup.rollup(config)
  await bundle.write(output)
}

function build () {
  const allConfig = Object.keys(builds).map(genConfig)
  let built = 0
  const total = allConfig.length
  const next = function () {
    buildEntry(allConfig[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch(function (e) {
      console.log(e)
      process.exit(1)
    })
  }

  next()
}

build()