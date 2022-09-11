import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'

import packageJson from './package.json'

const ESM_FILENAME = packageJson.module
const CJS_FILENAME = packageJson.main
const TYPES_FILENAME = packageJson.types

const TSCONFIG_FILENAME = './tsconfig.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: CJS_FILENAME,
        format: 'cjs',
        sourcemap: false,
        exports: 'auto',
      },
      {
        file: ESM_FILENAME,
        format: 'esm',
        sourcemap: false,
        exports: 'auto',
      },
    ],
    plugins: [resolve(), commonjs(), typescript({ tsconfig: TSCONFIG_FILENAME }), terser()],
  },
  {
    input: 'src/index.ts',
    output: [{ file: TYPES_FILENAME, format: 'esm' }],
    plugins: [dts()],
  },
]
