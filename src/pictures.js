'use strict';

(function() {
  var pictures;

  function jSONPRequest(url, callback) {
    var script = document.createElement('script');
    script.src = url + '?callback=JSONPCallback';
    window.JSONPCallback = function(data) {
      console.log(data);
      console.log(pictures);
      callback(data);
    };
    document.head.appendChild(script);
  }

  jSONPRequest('/api/pictures', function(data) {
    pictures = data;
  });
})();
