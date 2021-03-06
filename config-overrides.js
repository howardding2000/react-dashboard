/**
 * Customize-cra configration
 */

const { override } = require('customize-cra');
const addLessLoader = require('customize-cra-less-loader');

module.exports = override(
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#DD6B20', 
        },
        cssModules: {
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
        },
      },
    },
  })
);
