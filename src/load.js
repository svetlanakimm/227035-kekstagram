/**
 * Created by Светлана on 15.09.16.
 */

'use strict';

define(function() {
  function load(url, params, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function(evt) {
      var requestObj = evt.target;
      var response = requestObj.response;
      var data = JSON.parse(response);
      callback(data);
    };

    xhr.open('GET', url +
      '?from=' + (params.from || 0) +
      '&to=' + (params.to || Infinity) +
      '&filter=' + (params.filter || 'default')
    );

    xhr.send();
  }
  return load;
});
