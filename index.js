const render = require('./lib/render');
const expressNunjucks = require('express-nunjucks');
const log = require('debug')('r2:form');

module.exports = function Form(app) {
  const mongoose = app.service('Mongoose');
  if (!mongoose) {
    return log('service [Mongoose] not found!');
  }

  app.set('views', `${__dirname}/view`);

  const isDev = app.get('env') === 'development';
  expressNunjucks(app, {
    watch: isDev,
    noCache: isDev,
  });

  return {
    render: render(app),
  };
};
