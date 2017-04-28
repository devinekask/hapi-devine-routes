const path = require(`path`);
const glob = require(`glob`);

const chalk = require(`chalk`);

module.exports.register = (server, options, next) => {

  const {path: p, log = true} = options;

  if (!p) {
    throw new Error(`"path" required`);
  }

  const logRoute = ({path, method}) => {
    console.log(
      `  ${chalk.yellow(`${method}`)} -> ${chalk.cyan(`${path}`)}`
    );
  };

  glob(

    path.join(p, `**/*.js`),
    {ignore: [`**/*/index.js`, `**/*/_*.js`]},

    (err, files) => {

      files.forEach(f => {

        if (log) console.log(``);

        const routes = require(f);

        server.route(routes);

        if (log) {

          const base = path.basename(p);
          const file = path.relative(p, f);

          console.log(`${chalk.yellow(`hapi-devine-routes`)}: registered routes in ${chalk.cyan(`${base}/${file}`)}:`);
          if (log) console.log(``);
          routes.forEach(r => logRoute(r));

        }

      });

      if (log) console.log(``);

    }

  );

  next();

};

module.exports.register.attributes = {
  pkg: require(`./package.json`)
};
