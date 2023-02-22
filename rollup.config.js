export default {
    input: 'dist/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'es',
        name: 'ionicDiscoveryExports',
        sourcemap: true,
        inlineDynamicImports: true,
      }
    ],
    external: [],
  };