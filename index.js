const path = require(`path`);
const glob = require(`glob`);

const chalk = require(`chalk`);

module.exports.register = (server, options, next) => {

  const {routesDir} = options;

  if (!routesDir) {
    throw new Error(`"routesDir" required`);
  }

  const log = ({path, method}) => {
    console.log(
      `  ${chalk.yellow(`${method}`)} -> ${chalk.cyan(`${path}`)}`
    );
  };

  glob(

    path.join(routesDir, `**/*.js`),
    {ignore: [`**/*/index.js`, `**/*/_*.js`]},

    (err, files) => files.forEach(f => {

      const routes = require(f);

      server.route(routes);

      if (log) {

        const base = path.basename(routesDir);
        const file = path.relative(routesDir, f);

        console.log(``);
        console.log(`${chalk.yellow(`hapi-devine-routes`)}: registered routes in ${chalk.cyan(`${base}/${file}`)}:`);
        if (log) console.log(``);
        routes.forEach(r => log(r));

      }

    })

  );

  if (log) console.log(``);

  next();

};

module.exports.register.attributes = {
  pkg: require(`./package.json`)
};
