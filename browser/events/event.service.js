angular.module('zekeData')
  .factory('Event', function(DS) {
    return DS.defineResource({
      name: 'event',
      idAttribute: '_id',
      relations: {
        hasOne: {
          eventType: {
            localField: 'loaded_type',
            localKey: 'type'
          }
        }
      }
    })
  })