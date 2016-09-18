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
    this.data = pictureData;
    this.pictureNumber = pictureNumber;

    this.element = elementToClone.cloneNode(true);
    this.element.href = this.data.url;
    this.imgElement = this.element.querySelector('img');

    this.element.querySelector('.picture-comments').textContent = this.data.comments;
    this.element.querySelector('.picture-likes').textContent = this.data.likes;

    this.onImageClick = this.onImageClick.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.onImageLoadError = this.onImageLoadError.bind(this);

    this.image = new Image();
    this.image.addEventListener('load', this.onImageLoaded);
    this.image.addEventListener('error', this.onImageLoadError);
    this.image.src = this.data.url;

    return this;
  };

  Picture.prototype.onImageLoaded = function(ev) {
    this.imgElement.src = ev.target.src;  // Image object source
    this.imgElement.width = IMAGES_WIDTH;
    this.imgElement.height = IMAGES_HEIGHT;

    this.imgElement.addEventListener('click', this.onImageClick);
  };

  Picture.prototype.onImageLoadError = function() {
    this.element.classList.add('picture-load-failure');
  };

  Picture.prototype.onImageClick = function(ev) {
    gallery.show(this.pictureNumber);
    ev.preventDefault();
  };

  Picture.prototype.remove = function() {
    this.imgElement.removeEventListener('click', this.onImageClick);
    this.image.removeEventListener('load', this.onImageLoaded);
    this.image.removeEventListener('error', this.onImageLoadError);
  };

  return Picture;
});
