// app-api/models/todo.js
module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define("Todo", {
    text: DataTypes.STRING,
    complete: DataTypes.INTEGER
  });
  return Todo;
};
