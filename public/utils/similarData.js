const axios = require('axios');


const API_KEY = '4cec2ddfc502e16f0390dd6f0188dc39'; // Delete this string before uploading to GitHub

// Function to fetch similar movies using a movie ID
const getSimilarMovies = async (movieId) => {
    try {
        // Make an API request to get similar movies
        let url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`;
        //console.log(url);

        const response = await axios.get(url);
        
        // Return the array of similar movies
        return response.data;
    } catch (error) {
        console.error('Error fetching similar movies:', error);
        
        // Return an empty array in case of an error
        return [];
    }
};

module.exports = getSimilarMovies;