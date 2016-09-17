'use strict';

define(['./load', './picture', './gallery'], function(load, Picture, gallery) {
  var container = document.querySelector('.pictures');
  var filter = document.querySelector('.filters');
  filter.classList.add('hidden');

  function renderPictures(picturesData) {
    picturesData.forEach(function(pictureData, i) {
      var picture = new Picture(pictureData, i);
      container.appendChild(picture.element);
    });

    filter.classList.remove('hidden');
  }

  load('/api/pictures', {}, function(data) {
    renderPictures(data);
    gallery.setPictures(data);
  });
});

