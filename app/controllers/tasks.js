// app/controllers/tasks.js
import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    deleteTodo: function(id){
			this.store.findRecord('todo', id).then(function(todo){
        todo.deleteRecord();
				todo.save();
			});
		},
    completeTodo: function(id){
      this.store.findRecord('todo', id).then(function(task) {
        // Toggle complete on button click
        var complete = task.complete ? 0 : 1;
        // Set / update db
        task.set('complete', complete);
        task.save();
        // Hide edit dialog for "complete"
        task.set('editAt', true);
      });
    },
    saveTodo: function(id, text){
      this.store.findRecord('todo', id).then(function(task) {
        // Set / update db
        task.set('text', text);
        task.save();
        // Set temporary state back to true
        task.set('editAt', true);
      });
    },
    editTodo: function(id){
      this.store.findRecord('todo', id).then(function(task) {
        // Set to false, this will not persist on page reload
        // Must "save" to update changes in db
        var edit = task.editAt ? 0 : 1;
        task.set('editAt', edit);
      });
    }
  }
});
