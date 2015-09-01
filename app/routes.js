// app/routes.js

module.exports = function (app) {

  // get all lists
  app.get('/api/lists', function (req, res) {

  });

  // create a list
  app.post('/api/list', function (req, res) {

  });

  // get a single list
  app.get('/api/list/:list_id', function (req, res) {

  });

  // delete a list
  app.delete('/api/list/:list_id', function (req, res) {

  });

  // create an item on a list
  app.post('/api/list/:list_id/', function (req, res) {

  });

  // delete an item from a list
  app.delete('/api/list/:list_id/:item_id', function (req, res) {

  });

  app.get('*', function (req, res) {
    res.sendfile('./public/index.html');
  });
};
