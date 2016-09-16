'use strict';

define(['./load', './picture', './gallery'], function(load, renderPicture, gallery) {
  var filter = document.querySelector('.filters');
  filter.classList.add('hidden');

  function renderPictures(pictures) {
    pictures.forEach(function(picture, i) {
      renderPicture(picture, i);
    });

    filter.classList.remove('hidden');
  }

  load('/api/pictures', function(data) {
    renderPictures(data);
    gallery.setPictures(data);
  });
});
