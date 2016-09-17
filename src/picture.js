/**
 * Created by Светлана on 15.09.16.
 */

'use strict';

define(['./gallery'], function(gallery) {
  var IMAGES_WIDTH = 182;
  var IMAGES_HEIGHT = 182;

  var template = document.querySelector('#picture-template');
  var elementToClone;
  if ('content' in template) {
    elementToClone = template.content.querySelector('.picture');
  } else {
    elementToClone = template.querySelector('.picture');
  }

  var Picture = function(pictureData, pictureNumber) {
    var self = this;

    self.data = pictureData;

    self.element = elementToClone.cloneNode(true);
    self.element.href = self.data.url;
    self.element.querySelector('.picture-comments').textContent = self.data.comments;
    self.element.querySelector('.picture-likes').textContent = self.data.likes;

    self.onImageClick = function(ev) {
      gallery.show(pictureNumber);
      ev.preventDefault();
    };

    var imgElement = self.element.querySelector('img');

    self.remove = function() {
      imgElement.onclick = null;
    };

    var img = new Image();
    img.onload = function() {
      imgElement.src = this.src;
      imgElement.width = IMAGES_WIDTH;
      imgElement.height = IMAGES_HEIGHT;

      imgElement.onclick = function(ev) {
        self.onImageClick(ev);
      };
    };
    img.onerror = function() {
      self.element.classList.add('picture-load-failure');
    };
    img.src = this.data.url;

    return self;
  };

  return Picture;
});
