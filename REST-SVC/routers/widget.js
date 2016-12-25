const express = require('express');
const widgetRouter = express.Router();

widgetRouter.route('/widgets')
  .get( function(req, res) {
    res.json([
      { name: 'widget 1', color: 'blue', size: 'large', quantity: 3},
      { name: 'widget 2', color: 'red', size: 'medium', quantity: 5},
      { name: 'widget 3', color: 'orange', size: 'small', quantity: 15},
    ]);
  })
  .post();

widgetRouter.route('/widgets/:widgetId')
  .get()
  .put()
  .delete();

  module.exports = widgetRouter;
