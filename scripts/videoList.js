'use strict';
/* global $, API, store */

const videoList = (function() { 

  function decorateResponse(response) {
    return response.items.map(function(item){
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
      };
    });
  }

  function generateVideoItemHtml(video) {
    console.log(video);
    return `
  <li data-video-id="${video.id}"=>
    <h3>${video.title}</h3>
    <img src="${video.thumbnail}" alt="">
  </li>
  `;
  }

  function render() {
    const html = store.videos.map(video => generateVideoItemHtml(video));
    $('.results').html(html);
  }

  function handleFormSubmit() {
    $('form').submit(function (event) {
      event.preventDefault();
      let searchTerm = $('#search-term').val();
      $('#search-term').val('');
      API.fetchVideos(searchTerm, function(response){
        store.addVideosToStore(decorateResponse(response));
        render();
      });
    });
  }

  function bindEventListeners() {
    handleFormSubmit();
    generateVideoItemHtml();
    decorateResponse();
  }

  return {
    render,
    bindEventListeners
  };

}());
