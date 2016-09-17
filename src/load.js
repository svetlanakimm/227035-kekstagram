/**
 * Created by Светлана on 15.09.16.
 */

'use strict';

define(function() {
  function load(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function(evt) {
      var requestObj = evt.target;
      var response = requestObj.response;
      var data = JSON.parse(response);
      callback(data);
    };
    xhr.send();
  }

  function jSONPRequest(url, callback) {
    var script = document.createElement('script');
    script.src = url + '?callback=JSONPCallback';
    window.JSONPCallback = function(data) {
      callback(data);
    };
    document.head.appendChild(script);
  }

  return load;
});
