const path = require('path');
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = (env = { production: false }) => {
  // Bellow is configuration for both server and client side
  const baseConfig = {
    context: path.resolve(__dirname),
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.json'],
    },
    output: {
      filename: env.production ? '[name]-[hash].js' : '[name].js',
      chunkFilename: env.production ? '[name]-[hash].chunk.js' : '[name].chunk.js',
      publicPath: env.production ? '/' : 'http://localhost:9090/',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          test: /\.[jt]sx?$/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
          exclude: /node_modules\/(?!@assmat-facile)/,
        },
        {
          test: /\.(woff2?|otf|ttf)$/,
          use: { loader: 'file-loader', options: { name: 'fonts/[name]-[hash].[ext]' } },
        },
        {
          test: /\.(svg|png|jpg|jpeg|gif)$/,
          use: { loader: 'url-loader', options: { limit: 10000, name: '[path][name]-[hash].[ext]' } },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    devtool: env.production ? 'source-map' : 'cheap-module-source-map',
    mode: env.production ? 'production' : 'development',
    plugins: [
      // Use APP_ENV instead of NODE_ENV for environment specific configurations
      // Because NODE_ENV === "production" is used by many libraries to strip out code
      // from production builds
      new DefinePlugin({ 'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV || process.env.NODE_ENV) }),
    ],
  };

  // Below configuration builds up the client-side bundle
  const clientConfig = {
    ...baseConfig,
    entry: './packages/app/src/app.tsx', // TODO: set this to main entry point for Webapp
    resolve: {
      ...baseConfig.resolve,
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    optimization: {
      minimizer: [
        // Use Terser because Uglify sucks
        new TerserPlugin({
          cache: true,
          parallel: true,
        }),
      ],
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: true,
    },
    devServer: {
      contentBase: './dist',
      hot: true,
      port: process.env.PORT || 9090,
      host: 'localhost',
      // Write assets to disk to let API server the index.html enhanced with SSR
      writeToDisk: true,
      // Change index file to point to nothing to make sure webpack dev server proxy all requests
      // to API and shows SSR result
      index: '__doNotServerIndexWithWebpack.html',
      // Proxy any request that is not a Webpack asset to API
      proxy: {
        '*': 'http://localhost:5000',
      },
    },
    plugins: [
      ...baseConfig.plugins,
      new HotModuleReplacementPlugin(),
      // Use error overlay similar to create-react-app
      new ErrorOverlayPlugin(),
      // Create a __SERVER_SIDE__ global to help running code in one of both sides
      new DefinePlugin({ __SERVER_SIDE__: 'false' }),
      // Generate index.html with all assets
      new HtmlWebpackPlugin({
        template: './packages/app/src/index.html',
      }),
      // Generate a pre-cache service worker so that all assets of the website gets
      // cached in advance to achieve better navigation performance
      new GenerateSW({
        exclude: [/\.html$/, /\.map$/, /assets\/icons/],
      }),
      // PWA Manifest helps create a PWA by generating icons and manifest.json
      new WebpackPwaManifest({
        name: 'App name', // TODO: Set this to your application name
        short_name: 'App name', // TODO: Set this to a short version of the name for use in mobile home screens
        description: "App name", // TODO: Use this to describe your application in application managers of mobiles
        theme_color: '#f5f9fa', // TODO: Use this to set status bar color
        background_color: '#f5f9fa', // TODO: Use this to set splash background color
        icons: [
          {
            // TODO: Set this to the path to your app icon, will be used as splash logo
            // when booting in PWA mode
            src: path.resolve('path/to/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets/icons/'),
          },
        ],
      }),
      // Generates .favicon, apple-touch-icons, etc...
      new WebappWebpackPlugin({
        // TODO: Set this to the path to your app icon, will be used as favicon
        // and other platform specific icons
        logo: 'path/to/logo.png',
        prefix: 'assets/icons/',
        inject: true,
      }),
    ],
  };

  // Bellow configuration builds up the server side configuration
  const serverConfig = {
    ...baseConfig,
    entry: { api: './packages/api/src/api.tsx' }, // TODO: Set this to point to API main entry point
    target: 'node',
    output: {
      ...baseConfig.output,
      // Filename is fix because we don't need cache busting here
      filename: 'api.js',
    },
    externals: nodeExternals({
      whitelist: [/* Whitelist your workspace modules so they also get compiled */],
    }),
    node: {
      __dirname: false,
      __filename: false,
    },
    plugins: [
      ...baseConfig.plugins,
      new CleanWebpackPlugin(),
      // Create a __SERVER_SIDE__ global to help running code in one of both sides
      new DefinePlugin({ __SERVER_SIDE__: 'true' }),
    ],
  };

  return [clientConfig, serverConfig];
};
