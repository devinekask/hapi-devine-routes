# hapi-devine-routes

## Description

🔧 This Hapi plugin loads all routes in the given directory and registers them on your Hapi server

**index.js and files starting with a _ are ignored**

## Install hapi-devine-mongodb

```bash
yarn add hapi-devine-mongodb
```

## Usage

register this module as a plugin in Hapi

```js

server.register({

  register: require(`hapi-devine-routes`),

  options: {
    path: path.join(__dirname, `routes`) // routes directory (required)
    log: true // provide logs (optional, default: true)
  }

}, pluginHandler);

```

The files in your routesDir should return valid Hapi routes (array of route objects / 1 route object).

## License

MIT
