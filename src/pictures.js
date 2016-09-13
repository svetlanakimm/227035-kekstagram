'use strict';

(function() {
  var pictures;

  function JSONPRequest(url, callback) {
    var script = document.createElement("script");
    script.src = url + '?callback=JSONPCallback';
    window.JSONPCallback = function(data) {
      console.log(data);
      callback(data);
    };
    document.head.appendChild(script);
  }

  JSONPRequest('/api/pictures', function(data) {
    pictures = data;
  });
})();