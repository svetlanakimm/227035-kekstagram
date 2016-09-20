'use strict';

module.exports = function(list, filterID) {
  var filters = {
    'filter-popular': function(list) {
      return list;
    },
    'filter-new': function(list) {
      var d = new Date();
      d = d.getTime();
      return list
        .filter(function(elem) {
          return (d - elem.created) <= 3 * 24 * 60 * 60 * 1000;
        })
        .sort(function(a, b) {
          return b.created - a.created;
        });
    },
    'filter-discussed': function(list) {
      return list
        .slice()
        .sort(function (a, b) {
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
