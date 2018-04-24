// app-api/models/todo_history.js
module.exports = function(sequelize, DataTypes) {
  var Todo_history = sequelize.define("Todo_history", {
    todo_id: DataTypes.INTEGER,
    action: DataTypes.STRING
  });
  return Todo_history;
};
