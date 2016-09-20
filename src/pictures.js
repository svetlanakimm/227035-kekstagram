'use strict';

define(['./load', './picture', './gallery'], function(load, Picture, gallery) {
  var picturesContainer = document.querySelector('.pictures');
  var filterElement = document.querySelector('.filters');
  var footerElement = document.querySelector('footer');
  var pageNumber = 0;
  var PAGE_SIZE = 12;
  var GAP = 80;

  var currentFilter = localStorage.getItem('filter') || 'filter-popular';
  loadPictures(pageNumber, currentFilter);
  document.querySelector('#' + currentFilter).checked = true;

  filterElement.classList.add('hidden');

  function renderPictures(picturesData) {
    picturesData.forEach(function(pictureData, i) {
      var picture = new Picture(pictureData, i);
      picturesContainer.appendChild(picture.element);
    });

    filterElement.classList.remove('hidden');
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

  function reloadPictures(filter) {
    pageNumber = 0;
    removePictures();
    loadPictures(pageNumber, filter);
  }

  var scrollTimeout;
  function loadOtherPictures() {
    if (footerElement.getBoundingClientRect().bottom - window.innerHeight < GAP) {
      loadPictures(pageNumber++);
    }
  }

  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(loadOtherPictures, 100);
  });

  filterElement.addEventListener('change', function() {
    currentFilter = filterElement.querySelector(':checked').id;
    if (localStorage) {
      localStorage.setItem('filter', currentFilter);
    }
    reloadPictures(currentFilter);
  }, true);
});


