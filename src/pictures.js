'use strict';

(function() {
  var IMAGES_WIDTH = 182;
  var IMAGES_HEIGHT = 182;

  window.pictures = [];

  var filter = document.querySelector('.filters');
  var picturesContainer = document.querySelector('.pictures');

  function jSONPRequest(url, callback) {
    var script = document.createElement('script');
    script.src = url + '?callback=JSONPCallback';
    window.JSONPCallback = function(data) {
      callback(data);
    };
    document.head.appendChild(script);
  }

  function appendPicture(picture, container, elementToClone) {
    var pictureElem = elementToClone.cloneNode(true);
    pictureElem.href = picture.url;
    pictureElem.querySelector('.picture-comments').textContent = picture.comments;
    pictureElem.querySelector('.picture-likes').textContent = picture.likes;

    var img = new Image();
    img.onload = function() {
      var imgElement = pictureElem.querySelector('img');
      imgElement.src = this.src;
      imgElement.width = IMAGES_WIDTH;
      imgElement.height = IMAGES_HEIGHT;
    };
    img.onerror = function() {
      pictureElem.classList.add('picture-load-failure');
    };
    img.src = picture.url;

    container.appendChild(pictureElem);
  }

  function renderPictures() {
    var template = document.querySelector('#picture-template');

    var elementToClone;
    if ('content' in template) {
      elementToClone = template.content.querySelector('.picture');
    } else {
      elementToClone = template.querySelector('.picture');
    }

    window.pictures.forEach(function(picture) {
      appendPicture(picture, picturesContainer, elementToClone);
    });

    filter.classList.remove('hidden');
  }

  filter.classList.add('hidden');

  jSONPRequest('/api/pictures', function(data) {
    window.pictures = data;

    renderPictures();
  });

})();
