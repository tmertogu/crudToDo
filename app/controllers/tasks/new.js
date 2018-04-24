// app/controllers/tasks/new.js
import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    addTodo: function(){
      var text = this.get('todo');

      // Create
      var newTodo = this.store.createRecord('todo', {
        text: text
      });

      // Save, confirm
      newTodo.save();

      // Clear
      this.setProperties({
        todo: ''
      });
    }
  }
});
