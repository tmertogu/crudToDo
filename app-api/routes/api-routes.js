// app-api/routes/api-routes.js
var db = require("../models");

module.exports = function(app) {

  // GET todo by id
  app.get("/api/todos/:id", function(req, res) {
    db.Todo.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });
  });

  // GET all todos
  app.get("/api/todos", function(req, res) {
    db.Todo.findAll({}).then(function(dbTodo) {
      res.json(dbTodo);
    });
  });

  // POST new todo
  app.post("/api/todos", function(req, res) {
    // Log create in history
    db.Todo.create({
      text: req.body.todo.text,
      complete: req.body.todo.complete
    }).then(function(dbTodo) {
      // Log creation using new primary key
      db.Todo_history.create({
        todo_id: dbTodo.dataValues.id,
        action: "Create New Record: "+dbTodo.dataValues.text+
              ". Complete: "+dbTodo.dataValues.complete
      });
      res.json(dbTodo);
    });
  });

  // DELETE by id
  app.delete("/api/todos/:id", function(req, res) {
    // Admittedly a "hacky" fix for the response.
    db.Todo.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbTodo) {
      db.Todo.destroy({
        where: {
          id: req.params.id
        }
      });
      res.json(dbTodo);
    });
  });

  // Update by id
  app.put("/api/todos/:id", function(req, res) {
    db.Todo.update({
      text: req.body.todo.text,
      complete: req.body.todo.complete
    },{
      where: {
        id: req.params.id
      }
    }).then(function(dbTodo) {
      // Log edit in history
      db.Todo_history.create({
        todo_id: req.params.id,
        action: "Modify Record: "+req.body.todo.text+
              ". Complete: "+req.body.todo.complete
      });
      db.Todo.findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbTodo) {
        res.json(dbTodo);
      });
    });

  });
};
