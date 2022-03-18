const { override } = require("customize-cra");
const addLessLoader = require("customize-cra-less-loader");
// const { getThemeVariables } = require('antd/dist/theme');

module.exports = override(
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: { "@primary-color": "#DD6B20" },
        //   cssModules: {
        //     localIdentName: '[path][name]__[local]--[hash:base64:5]',
        //   },
      },
    },
  })
);
