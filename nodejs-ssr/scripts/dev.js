const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const nodemon = require('nodemon');
const path = require('path');

const getConfig = require('../webpack.config');

const [clientConfig, serverConfig] = getConfig();

WebpackDevServer.addDevServerEntrypoints(clientConfig, clientConfig.devServer);
const serverCompiler = webpack(serverConfig);
const clientCompiler = webpack(clientConfig);

const server = new WebpackDevServer(clientCompiler, clientConfig.devServer);

server.listen(9090);

let firstRunDone = false;
serverCompiler.watch({ aggregateTimeout: 300 }, (err, stats) => {
  // eslint-disable-next-line no-console
  console.log(stats.toString({ colors: true }));
  if (!firstRunDone) {
    nodemon({
      script: path.join(process.cwd(), 'dist/api.js'),
      watch: false,
    });
    firstRunDone = true;
  } else {
    nodemon.emit('restart');
  }
});
