/**
 * Created by Светлана on 16.09.16.
 */

'use strict';

define(function() {
  var Gallery = function() {
    this.overlay = document.querySelector('.gallery-overlay');
    this.close = document.querySelector('.gallery-overlay-close');
    this.image = document.querySelector('.gallery-overlay-image');

    this.pictures = [];
    this.activePicture = 0;

    return this;
  };

  Gallery.prototype.setPictures = function(pictures) {
    this.pictures = pictures;
  };

  Gallery.prototype.hide = function() {
    this.overlay.classList.add('invisible');
    this.unbindHandlers();
  };

  Gallery.prototype.setActivePicture = function(num) {
    var picture = this.pictures[num];
    this.image.src = picture.url;
    this.overlay.querySelector('.likes-count').textContent = picture.likes;
    this.overlay.querySelector('.comments-count').textContent = picture.comments;
  };

  Gallery.prototype.show = function(num) {
    this.bindHandlers();
    this.overlay.classList.remove('invisible');
    this.setActivePicture(num);
  };

  Gallery.prototype.bindHandlers = function() {
    var self = this;

    this.close.onclick = function() {
      return self.hide();
    };

    this.image.onclick = function() {
      if (self.activePicture === self.pictures.length - 1) {
        self.activePicture = 0;
      } else {
        self.activePicture += 1;
      }
      self.setActivePicture(self.activePicture);
    };
  };

  Gallery.prototype.unbindHandlers = function() {
    this.image.onclick = null;
    this.close.onclick = null;
  };

  return new Gallery();
});
