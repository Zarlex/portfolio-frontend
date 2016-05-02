/**
 * Created by zarges on 22/01/16.
 */
'use strict';

angular.module('SampleApp.Start')

  .controller('StartDetailsController', function (collection) {
    this.collection = collection;

    this.drop = function(e, dragData, dropData){
      var model = this.collection.get(dragData.id);
      this.collection.remove(model);
      this.collection.add(model, {at:dropData})
    };

    this.viewModel = {
      enabled: true,
      rating: 4.6
    };

  })

  .constant('StartDetailsControllerResolver', {
    collection: function(){
      var collection = new mwUI.Backbone.Collection();
      collection.add([
        {id: 1, name: 'Peter'},
        {id: 2, name: 'Klaus'},
        {id: 3, name: 'Petra'},
        {id: 4, name: 'Claudia'},
        {id: 5, name: 'Sandro'},
        {id: 6, name: 'Sandra'}
      ]);
      return collection;
    }
  });