// app/routes.js

// load List model
var List = require('./models/list');

module.exports = function (app) {

  // get all lists
  app.get('/api/lists', function (req, res) {
    List.find(function (err, data) {
      if (err) {
        return res.send(err);
      }

      return res.json(data);
    });
  });

  // create a list
  app.post('/api/lists', function (req, res) {
    List.create({
      completed: false,
      created_at: new Date()
    }, function (err, lists) {
      if (err) {
        return res.send(err);
      }

      return res.json(lists);
    });
  });

  // get a single list
  app.get('/api/lists/:list_id', function (req, res) {
    List.findById(req.params.list_id, function (err, list) {
      if (err) {
        return res.send(err);
      }

      return res.json(list);
    });
  });

  // delete a list
  app.delete('/api/lists/:list_id', function (req, res) {
    List.remove({
      _id: req.params.list_id
    }, function (err) {
      if (err) {
        return res.send(err);
      }

      List.find(function (err, lists) {
        if (err) {
          return res.send(err);
        }

        return res.json(lists);
      });
    });
  });

  // create an item on a list
  app.post('/api/lists/:list_id/items', function (req, res) {
    List.findByIdAndUpdate(req.params.list_id, {
      $push: { items: { text: req.body.text, done: false }}},
      {  safe: true, upsert: true },
      function (err, list) {
        if (err) {
          return res.send(err);
        }

        return res.json(list);
      }
    );
  });

  // toggle an item on a list
  app.put('/api/lists/:list_id/items/:item_id', function (req, res) {
    List.update({ 'items._id': req.params.item_id },
      { $set: { 'items.$.done': req.body.done }},
      function (err) {
        if (err) {
          return res.send(err);
        }

        List.findById(req.params.list_id, function (err, list) {
          if (err) {
            return res.send(err);
          }

          return res.json(list);
        });
      }
    );
  });

  // delete an item from a list
  app.delete('/api/lists/:list_id/items/:item_id', function (req, res) {
    List.findByIdAndUpdate(req.params.list_id, {
        $pull: { items: { _id: req.params.item_id }}
      },
      function (err, list) {
        if (err) {
          return res.send(err);
        }

        return res.json(list);
      }
    );
  });

  app.get('*', function (req, res) {
    res.sendfile('./public/index.html');
  });
};
