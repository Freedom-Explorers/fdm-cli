import path from 'path'
import { cleandir } from 'rollup-plugin-cleandir'
import copy from 'rollup-plugin-copy'
import { externals } from 'rollup-plugin-node-externals'
import typescript from '@rollup/plugin-typescript'

const outDir = path.dirname('bin/fdm.js')

export default {
  input: 'fdm.ts',
  output: [
    {
      dir: outDir,
      format: 'esm',
      preserveModules: true
    }
  ],
  plugins: [
    cleandir(outDir),
    copy({
      targets: [{ src: 'lib/template', dest: 'bin/lib' }]
    }),
    externals(),
    typescript({
      tsconfig: 'tsconfig.json'
    })
  ]
}
