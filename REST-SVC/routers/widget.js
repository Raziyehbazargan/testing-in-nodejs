const express = require('express');
const widgetRouter = express.Router();

const path = require('path');
const db = require('../database').connect(path.join(__dirname, '..', 'widgets.json'));

widgetRouter.route('/widgets')
  .get( function(req, res) {
    db(con => con.getall().then(widgets => res.json(widgets)));

    // res.json([
    //   { name: 'widget 1', color: 'blue', size: 'large', quantity: 3},
    //   { name: 'widget 2', color: 'red', size: 'medium', quantity: 5},
    //   { name: 'widget 3', color: 'orange', size: 'small', quantity: 15},
    // ]);
  })
  .post();

widgetRouter.route('/widgets/:widgetId')
  .get(function(req, res) {
    db(con => con.get(parseInt(req.params.widgetId)).then(widgets => res.json(widgets)));
  })
  .put()
  .delete(function(req, res) {
    db(con => con.delete(parseInt(req.params.widgetId)).then(widgets => res.json(widgets)));
  });

  module.exports = widgetRouter;
