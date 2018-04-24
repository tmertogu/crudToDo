// app/serializers/todo.js
import DS from 'ember-data';
import Inflector from 'ember-inflector';

export default DS.RESTSerializer.extend({
  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    let typeKey = primaryModelClass.modelName;
    let ret = {};
    ret[typeKey] = payload;
    return this._normalizeResponse(store, primaryModelClass, ret, id, requestType, true);
  },
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    let pluralTypeKey = Inflector.inflector.pluralize(primaryModelClass.modelName);
    let ret = {};
    ret[pluralTypeKey] = payload;
    return this._normalizeResponse(store, primaryModelClass, ret, id, requestType, false);
  }
});
