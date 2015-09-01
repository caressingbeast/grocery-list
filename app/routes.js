// app/routes.js

// load List model
var List = require('./models/list');

module.exports = function (app) {

  // get all lists
  app.get('/api/lists', function (req, res) {
    List.find(function (err, data) {
      if (err) {
        res.send(err);
      }

      res.json(data);
    });
  });

  // create a list
  app.post('/api/list', function (req, res) {
    List.create({
      completed: false,
      created_at: new Date()
    }, function (err, lists) {
      if (err) {
        res.send(err);
      }

      res.json(lists);
    });
  });

  // get a single list
  app.get('/api/list/:list_id', function (req, res) {
    List.findById(req.params.list_id, function (err, list) {
      if (err) {
        res.send(err);
      }

      res.json(list);
    });
  });

  // delete a list
  app.delete('/api/list/:list_id', function (req, res) {
    List.remove({
      _id: req.params.list_id
    }, function (err) {
      if (err) {
        res.send(err);
      }

      List.find(function (err, lists) {
        if (err) {
          res.send(err);
        }

        res.json(lists);
      });
    });
  });

  // create an item on a list
  app.post('/api/list/:list_id', function (req, res) {
    List.findByIdAndUpdate(req.params.list_id, {
      $push: { items: { text: req.body.text, done: false }}},
      {  safe: true, upsert: true },
      function (err, list) {
        if (err) {
          res.send(err);
        }

        res.json(list);
      }
    );
  });

  app.put('/api/item/:item_id', function (req, res) {
    List.update({ 'items._id': req.params.item_id },
      { $set: { 'items.$.done': req.body.done }},
      function (err, list) {
        if (err) {
          res.send(err);
        }

        res.json(list);
      }
    );
  });

  // delete an item from a list
  app.delete('/api/list/:list_id/:item_id', function (req, res) {
    List.findByIdAndUpdate(req.params.list_id, {
        $pull: { items: { _id: req.params.item_id }}
      },
      function (err, list) {
        if (err) {
          res.send(err);
        }

        res.json(list);
      }
    );
  });

  app.get('*', function (req, res) {
    res.sendfile('./public/index.html');
  });
};
