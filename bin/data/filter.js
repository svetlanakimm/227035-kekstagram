'use strict';

module.exports = function(list, filterID) {
  var filters = {
    'filter-popular': function(list) {
      return list;
    },
    'filter-new': function(list) {
      return list
        .filter(function(elem) {
          return Math.abs(elem.created - new Date()) <= 3 * 24 * 60 * 60 * 1000;
        })
        .sort(function(a, b) {
          return a.created - b.created;
        });
    },
    'filter-discussed': function(list) {
      return list
        .sort(function (a,b) {
          return b.comments - a.comments
        });
    }
  };

  if (filterID && (filterID in filters)) {
    return filters[filterID](list);
  } else {
    return list;
  }

};


