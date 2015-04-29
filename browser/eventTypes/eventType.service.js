angular.module('zekeData')
  .factory('EventType', function(DS) {
    return DS.defineResource({
      name: 'eventType',
      idAttribute: '_id',
      relations: {
        hasMany: {
          event: {
            foreignKey: 'type',
            localField: 'events'
          }
        }
      }
    })
  })