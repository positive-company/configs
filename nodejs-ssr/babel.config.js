module.exports = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
        exclude: ['transform-regenerator'],
      },
    ],
  ],
  plugins: [
    ['emotion', { sourceMap: true }], // TODO: Replace this with Styled Component if needed
    'react-hot-loader/babel',
    '@babel/plugin-proposal-class-properties',
  ],
  env: {
    production: {
      plugins: [
        'emotion', // TODO: Replace this with Styled Component if needed
        '@babel/plugin-proposal-class-properties',
      ],
    },
    test: {
      presets: [
        '@babel/preset-react',
        '@babel/preset-typescript',
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
            useBuiltIns: 'usage',
            corejs: 3,
            exclude: ['transform-regenerator'],
          },
        ],
      ],
      plugins: [
        'emotion', // TODO: Replace this with Styled Component if needed
        '@babel/plugin-proposal-class-properties',
      ],
    },
  },
};
