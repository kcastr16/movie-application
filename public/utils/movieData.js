const axios = require('axios');

const API_KEY = '4cec2ddfc502e16f0390dd6f0188dc39'; // Delete this string before uploading to github

const getId = async (query) => {
    try { // URL: https://api.themoviedb.org/3/movie/popular
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`);

        // Return the array of similar movies
        //console.log(response.data.results[0]);
         return response.data.results[0].id
    } catch (error) {
        console.error('Error fetching popular movies:', error);

        // Return an empty array in case of an error
        return []; 
    }
};

module.exports = getId;
