'use strict';

define(['./load', './picture'], function(load, renderPicture) {
  var filter = document.querySelector('.filters');
  filter.classList.add('hidden');

  function renderPictures(pictures) {
    pictures.forEach(function(picture) {
      renderPicture(picture);
    });

    filter.classList.remove('hidden');
  }

  load('/api/pictures', renderPictures);
});
