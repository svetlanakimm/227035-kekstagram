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

    this.hide = this.hide.bind(this);
    this.nextPicture = this.nextPicture.bind(this);
    this.bindHandlers();

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

  Gallery.prototype.nextPicture = function() {
    if (this.activePicture === this.pictures.length - 1) {
      this.activePicture = 0;
    } else {
      this.activePicture += 1;
    }
    this.setActivePicture(this.activePicture);
  };

  Gallery.prototype.bindHandlers = function() {
    this.close.addEventListener('click', this.hide);
    this.image.addEventListener('click', this.nextPicture);
  };

  Gallery.prototype.unbindHandlers = function() {
    this.image.removeEventListener('click', this.hide);
    this.close.removeEventListener('click', this.nextPicture);
  };

  return new Gallery();
});
