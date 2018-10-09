import clean from 'rollup-plugin-delete';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import url from 'rollup-plugin-url';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  external: [
    'react'
  ],
  output: [
    {
      globals: {
        react: 'React'
      },
      file: pkg.main,
      format: 'cjs',
      name: 'bug-poc'
    },
    {
      globals: {
        react: 'React'
      },
      file: pkg.module,
      format: 'es',
      name: 'bug-poc'
    }
  ],
  plugins: [
    clean({ targets: 'dist/*' }),
    resolve({
      extensions: ['.js', '.jsx', '.mjs'],
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs({
      sourceMap: false
    }),
    // Inline import files as data-URIs or copy them to output
    // @see https://github.com/rollup/rollup-plugin-url
    url({
      limit: 10 * 1024 // inline files < 25k, copy files > 25k
    }),
    babel({
      // See babel config in `package.json`
      exclude: '**/node_modules/**',
      runtimeHelpers: true
    })
  ]
};