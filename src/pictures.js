'use strict';

define(['./load', './picture', './gallery'], function(load, Picture, gallery) {
  var picturesContainer = document.querySelector('.pictures');
  var filter = document.querySelector('.filters');
  var footer = document.querySelector('footer');
  var pageNumber = 0;
  var PAGE_SIZE = 12;
  var GAP = 80;

  if (localStorage && localStorage.getItem('filter')) {
    var currentFilter = localStorage.getItem('filter');
    loadPictures(pageNumber, currentFilter);
    document.getElementById(currentFilter).checked = true;
  } else {
    loadPictures(pageNumber, '');
  }

  filter.classList.add('hidden');

  function renderPictures(picturesData) {
    picturesData.forEach(function(pictureData, i) {
      var picture = new Picture(pictureData, i);
      picturesContainer.appendChild(picture.element);
    });

    filter.classList.remove('hidden');
  }

  function loadPictures(page, filter) {
    load('/api/pictures', {
      from: page * PAGE_SIZE,
      to: (page + 1) * PAGE_SIZE,
      filter: filter
    }, function(data) {
      renderPictures(data);
      gallery.setPictures(data);
    });
  }

  function removePictures() {
    while (picturesContainer.firstChild) {
      picturesContainer.removeChild(picturesContainer.firstChild);
    }
  }

  function reloadPictures(filter){
    pageNumber = 0;
    removePictures();
    loadPictures(pageNumber, filter);
  }

  var scrollTimeout;
  function loadOtherPictures() {
    if (footer.getBoundingClientRect().bottom - window.innerHeight < GAP) {
      loadPictures(pageNumber++);
    }
  }

  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(loadOtherPictures, 100);
  });

  filter.addEventListener('change', function() {
    var currentFilter = filter.querySelector(':checked').id;
    if (localStorage) {
      localStorage.setItem('filter', currentFilter);
    }
    reloadPictures(currentFilter);
  }, true);
});

