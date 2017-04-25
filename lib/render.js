const promisify = require('es6-promisify');
const _ = require('underscore');

module.exports = (app) => {
  const render = promisify(app.render, app);
  const fieldsArr = ['string', 'number', 'textarea', 'array', 'datetime'];
  const renderFields = (fields, paths, views) => {
    _.each(fields, (name) => {
      const { settings = {} } = paths[name].options;
      const instance = settings.field || paths[name].instance.toLowerCase();
      if (fieldsArr.includes(instance)) {
        views.push(render(`form/fields/${instance}.html`, { name }));
      }
    });
    return views;
  };

  return (model, options = {}) => {
    const { fields, prefix } = options;
    const Model = app.service('Mongoose').model(model);
    const views = [];
    const paths = Model.schema.paths;
    const getFields = fields || Object.keys(paths);

    return Promise.all(renderFields(getFields, paths, views))
      .then(data => Promise.resolve(data.join('')));
  };
};
