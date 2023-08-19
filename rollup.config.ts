import path from 'path'
import alies from '@rollup/plugin-alias'
import { cleandir } from 'rollup-plugin-cleandir'
import copy from 'rollup-plugin-copy'
import { externals } from 'rollup-plugin-node-externals'
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'

const outDir = path.dirname('bin/fdm.js')

export default {
  input: 'fdm.ts',
  output: [
    {
      dir: outDir,
      format: 'esm',
      preserveModules: true,
      banner: '#!/usr/bin/env node'
    }
  ],
  plugins: [
    alies({
      entries: [{ find: '@', replacement: '.' }]
    }),
    cleandir(outDir),
    copy({
      targets: [{ src: 'lib/template', dest: 'bin/lib' }]
    }),
    externals(),
    json(),
    typescript({
      tsconfig: 'tsconfig.json'
    })
  ]
}
