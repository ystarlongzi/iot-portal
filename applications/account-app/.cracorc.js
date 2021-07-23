const path = require('path');
const CracoLessPlugin = require('craco-less');
const CracoAlias = require('craco-alias');
const { name } = require('./package');

module.exports = {
  webpack: {
    configure: (config, { env: webpackEnv, paths }) => {
      config.output.library = `${name}-[name]`;
      config.output.libraryTarget = 'umd';
      config.output.jsonpFunction = `webpackJsonp_${name}`;
      config.output.globalObject = 'window';
      config.output.publicPath = '/account-app';
      paths.appBuild = path.join(path.dirname(paths.appBuild), `dist`);
      config.output.path = paths.appBuild;

      config.devtool = webpackEnv !== 'production' ? 'eval-source-map' : 'none'

      return config;
    },
  },
  devServer: (config) => {
    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    config.historyApiFallback = true;
    config.hot = true;
    config.watchContentBase = true;
    config.liveReload = true;
    return config;
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
        cssLoaderOptions: {
          modules: { localIdentName: '[local]_[hash:base64:5]' },
        },
      },
    },
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.extend.json',
      },
    },
  ],
};
