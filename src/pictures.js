'use strict';

define(['./load', './picture', './gallery'], function(load, Picture, gallery) {
  var container = document.querySelector('.pictures');
  var filter = document.querySelector('.filters');
  var footer = document.querySelector('footer');
  var pageNumber = 0;
  var PAGE_SIZE = 12;
  var GAP = 80;

  filter.classList.add('hidden');

  function renderPictures(picturesData) {
    picturesData.forEach(function(pictureData, i) {
      var picture = new Picture(pictureData, i);
      container.appendChild(picture.element);
    });

    filter.classList.remove('hidden');
  }

  function loadPictures(pageNumber) {
    load('/api/pictures', {
      from: pageNumber * PAGE_SIZE,
      to: (pageNumber + 1) * PAGE_SIZE
    }, function(data) {
      renderPictures(data);
      gallery.setPictures(data);
    })
  }

  window.addEventListener('scroll', function(evt) {
    if (footer.getBoundingClientRect().bottom - window.innerHeight < GAP) {
      loadPictures(pageNumber++);
    }
  });

  loadPictures(0);
});

