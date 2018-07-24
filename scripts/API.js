'use strict';
/* global $ */

const API = (function(){

  const API_KEY = 'AIzaSyDdjxW9JL2BZLC6uKqxJRrmK9sjU4xg2hQ';

  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  function fetchVideos(searchTerm, callback) {
    const query = {
      'key' : API_KEY,
      'part' : 'snippet',
      'per_page': 5,
      'q' : searchTerm
    };
    $.getJSON(BASE_URL, query, callback);
  }
  
  return {
    API_KEY,
    BASE_URL,
    fetchVideos
  };
});