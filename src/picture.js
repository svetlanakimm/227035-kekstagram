/**
 * Created by Светлана on 15.09.16.
 */

'use strict';

define(function() {
  var IMAGES_WIDTH = 182;
  var IMAGES_HEIGHT = 182;

  var container = document.querySelector('.pictures');

  var template = document.querySelector('#picture-template');
  var elementToClone;
  if ('content' in template) {
    elementToClone = template.content.querySelector('.picture');
  } else {
    elementToClone = template.querySelector('.picture');
  }

  function appendPicture(picture) {
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

  return appendPicture;
});
