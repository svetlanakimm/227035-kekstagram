/**
 * Created by Светлана on 15.09.16.
 */

'use strict';

define(function() {
  function jSONPRequest(url, callback) {
    var script = document.createElement('script');
    script.src = url + '?callback=JSONPCallback';
    window.JSONPCallback = function(data) {
      callback(data);
    };
    document.head.appendChild(script);
  }

  return jSONPRequest;
});
