# react-dashboard

## Before Everything

The purpose of developing this project is to gain a deeper studying of the React components,hooks and related frameworks in real projects. I hope this project could help those developers who are learning or using React as a beignner.I would like to share the knowledge learned in the development process, as well as some typical bug solving process. Hope you will like this project, and please feel free to me your feedback and suggestions anytime. Thank you ver much!

## Index
- [react-dashboard](#react-dashboard)
  - [Before Everything](#before-everything)
  - [Index](#index)
  - [Summary Description](#summary-description)
  - [Features](#features)
  - [User Interface](#user-interface)
  - [Router](#router)
  - [Frontend framework](#frontend-framework)
  - [Backend framework](#backend-framework)
  - [Function module](#function-module)
  - [Documentation](#documentation)
    - [Ant Design Theme Configration](#ant-design-theme-configration)
      - [install `less` and `less-loader` to support less](#install-less-and-less-loader-to-support-less)
      - [install 3rd-part react webpack config tools](#install-3rd-part-react-webpack-config-tools)
      - [configrat Ant Design Less variables](#configrat-ant-design-less-variables)

##  Summary Description

react-dashboard is a dashboard SPA(single page application) developed with ReactJS,Express and Mongodb.
It will be split into two parts, client side and server side.

- react-dashboard: client side
- react-dashboard-server: server side

## Features

- Front and background separation
- Modularly
- Componentized
- Engineering

## User Interface 


## Router 
 - /login
 - / & /dashboard
## Frontend framework

- `react` 17.0.2
- `react-redux`, 7.2.6 `@reduxjs/toolkit` 1.8.0
- `react-router-dom` 6.2.2
- `antd` 4.19.2
- Axio
- ES6
- Webpack

## Backend framework

- Nodejs
- ExpressJs
- Mongodb

## Function module

- User management
- Product classification management
- Commodity management
- Authority management

## Documentation
### Ant Design Theme Configration

Ant Design is using Less as the development language for styling. 
Unfortunately, React natively does not support less, so we have to manually import the dependencies and configure Webpack.

#### install `less` and `less-loader` to support less

```bash
npm install less less-loader
```

#### install 3rd-part react webpack config tools

```bash
npm install react-app-rewired customize-cra customize-cra-less-loader
```

*We can use `npm run eject`  to expose the WebPack configuration file and config less in `webpack.config.js`, **but** it's an one way operation. If you don't really need to customize webPack to much, I recommend keeping it closed.*

I just want to go lightweight custom Webpack, so I chose an alternative that likes  `react-app-rewired` + `customize-cra` or `@carco/craco` + `craco-less`.

Here I use `customize-cra` + `customize-cra-less-loader`.
*(At first, I wanted to use `carco`, which is officially recommended by Ant Design, but I found that the current `@carco/craco` is not fully support CRA V5, and I faced some issue when I was trying to install it)*

#### configrat Ant Design Less variables

 - The version of dependencies I used are below:

```js
   "devDependencies": {
    "customize-cra": "^1.0.0",
    "customize-cra-less-loader": "^2.0.0",
    "less": "^3.13.1",
    "less-loader": "^7.3.0",
    "react-app-rewired": "^2.2.1"
  }
```
I import `customize-cra-less-loader` to support latest version of `less-loader`.

***Attention:`addLessLoader` in `customize-cra-less-loader` is a little different of `addLessLoader` in `customize-cra`. We should wrappe `lessOptions` into `lessLoaderOptions`!***

So the final configration will be like this :

config-overrides.js
```js
const { override } = require("customize-cra");
const addLessLoader = require("customize-cra-less-loader");

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
```
