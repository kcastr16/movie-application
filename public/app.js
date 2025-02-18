const express = require('express');
const path = require('path');
const getId = require('./utils/movieData');
const getSimilarMovies = require('./utils/similarData');

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));


// Route to render the index
app.get('', (req, res) => {
    res.render('index', {
        title: 'Movie App',
    });
});


app.get('/get-similar', async (req, res) => {
    try {
        console.log(req.query);
        // Fetch the movie ID automatically (e.g., using "Shrek" as a default query)
        const movieId = await getId(req.query.userInput); 
        if (!movieId) {
            return res.status(400).send('No movie ID found for the given query.');
        }

        // Fetch similar movies using the ID
        const similarMovies = await getSimilarMovies(movieId);
        //console.log(similarMovies.results);
        // Respond with the similar movies as JSON

        let movieArr = similarMovies.results;
        let movieTitles = []

        //console.log(movieArr)
        movieArr.forEach((movie) =>{
            movieTitles.push({ 
                title: movie.title,
                poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              })
        })
        console.log(movieTitles)
        res.render('movieResults', {
            titles: movieTitles
        });
    } catch (error) {
        console.error('Error fetching similar movies:', error);
        res.status(500).send('Error fetching similar movies');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});