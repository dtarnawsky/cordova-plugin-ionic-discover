import commonjs from '@rollup/plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'dist/esm/index.js',
  output: {
    file: 'dist/index.js',
    format: 'es',
    name: 'ionicDiscoverExports',
    sourcemap: true,
    banner: '/*! Ionic Discover: https://ionicframework.com/  */',
  },

  plugins: [sourcemaps(), commonjs(), resolve()],
};