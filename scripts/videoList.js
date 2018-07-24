'use strict';
/* global $, api, store */

const videoList = (function() { 

  function generateVideoItemHtml(video) {
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

  const decorateResponse = function(fetchVideos) {
    // console.log(fetchVideos);
    return fetchVideos.items.map(function(item){
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
      };
    });
  };

  function handleFormSubmit() {
    $('form').submit(function (event) {
      event.preventDefault();
      let searchTerm = $('#search-term').val();
      $('#search-term').val('');
      api.fetchVideos(searchTerm, function(response){
        const vidArray = decorateResponse(response);
        store.addVideosToStore(vidArray);
        render();
      });
    });
  }

  function bindEventListeners() {
    handleFormSubmit();
  }

  return {
    render,
    bindEventListeners
  };
}());
