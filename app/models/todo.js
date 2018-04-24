// app/models/todo.js
import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  complete: DS.attr('number', {
    // Default task is NOT complete
    defaultValue: 0
  }),
  createdAt: DS.attr('string', {
    defaultValue() {
      // Convert to SQLite3 datetime format
      return new Date().toISOString();
    }
  }),
  updatedAt: DS.attr('string', {
    defaultValue() {
      // Convert to SQLite3 datetime format
      return new Date().toISOString();
    },
  }),
  editAt: DS.attr('string', {
    defaultValue() {
      // This is for front-end editing purposes only
      // Value will not persist or be sent to db
      return true;
    }
  })
});
