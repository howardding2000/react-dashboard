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
    - [React Router V6](#react-router-v6)
      - [\<Outlet\> Usage](#outlet-usage)

## Summary Description

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

- [`react` v17.0.2](https://reactjs.org/)
- [`react-redux` v7.2.6 `@reduxjs/toolkit` v1.8.0](https://react-redux.js.org/)
- [`react-router-dom` v6.2.2](https://reactrouter.com/)
- `[antd` v4.19.2](https://ant.design/)
- [Axio v0.26.1](https://axios-http.com/)
- ES6
- Webpack

## Backend framework

- [Nodejs](https://nodejs.org/en/)
- [ExpressJs](https://expressjs.com/)
- [Mongodb](https://www.mongodb.com/)

## Function module

- User management
- Product classification management
- Commodity management
- Authority management

## Documentation

### Breakpoint Width

```json
{
  "xs": "480px",
  "sm": "576px",
  "md": "768px",
  "lg": "992px",
  "xl": "1200px",
  "xxl": "1600px"
}
```

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

_We can use `npm run eject` to expose the WebPack configuration file and config less in `webpack.config.js`, **but it's a one way operation**. So if you don't really need to customize webPack to much, I recommend keeping it closed._

I just want to go lightweight custom Webpack, so I chose an alternative that likes `react-app-rewired` + `customize-cra` or `@carco/craco` + `craco-less`.

Here I use `customize-cra` + `customize-cra-less-loader`.
_(At first, I wanted to use `carco`, which is officially recommended by Ant Design, but I found that the current `@carco/craco` is not fully support CRA V5, and I faced some issue when I was trying to install it)_

Don't forget to change the script commands, because from now on, we'll compile the code via `react-app-rewired` not `react-scripts`.

```js
 "scripts": {
    // "start": "react-scripts start",
    // "build": "react-scripts build",
    // "test": "react-scripts test",
    // "eject": "react-scripts eject"

    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
```

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

**_Attention:`addLessLoader` in `customize-cra-less-loader` is a little different of `addLessLoader` in `customize-cra`. We should wrappe `lessOptions` into `lessLoaderOptions`!_**

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

## React Router V6

### \<Outlet\> Usage

> An `<Outlet>` should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered. If the parent route matched exactly, it will render a child index route or nothing if there is no index route.

`Outlet` is a handy Component that lets us return response route element anywhere under the parent element.I have an example in `DbContent` to show you how to use it.

App.js

```js
<Route path='/' element={<Dashboard />}>
  // sub route of '/'
  ...
  <Route path='users' element={<Users />} />
  ...
</Route>
```

Dashboard.jsx

```js
return (
  <>
    <Layout>
      <Sider>
       ...
      </Sider>
      <Layout>
        <Header>
          ...
        </Header>
        <Content>
          //`DbContent` is a compoment inside of `Dashboard`.
          <DbContent />
        </Content>
        <Footer>
          ...
        </Footer>
      </Layout>
    </Layout>
  </>
);
```

DbContent.jsx

```js
const DbContent = () => {
  return (
    <div>
      // Outlet is a placeholder of sub route element.
      <Outlet />
    </div>
  );
};
```
A \<link to='/users\> will render `<Users />` to relpace `<Outlet />`.

