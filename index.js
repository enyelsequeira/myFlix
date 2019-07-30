//importing express and morgan 
const express = require ('express');
const morgan = require('morgan');
//crating var to use express functionality
const app = express();

// servers documentation.html file from public folder
app.use(express.static('public'));
//log request using morgans's 
app.use(morgan('common'));

//list of movies
let topMovies = [ {
    title: 'avatar'
}, 
{ 
    title: 'Iron man'
},
{
    title: 'Men in black'
},
{
    title: 'the lion king'
},
{
    title: 'Avengers'
},
{
    title: 'x-men'
},
{
    title : 'Hercules'
},
{
    title: 'White house down'
},
{
    title: 'Aladin'
},
{
    title: 'Spider-man: Far from home'
}]

//GET requests
app.get('/', function(req, res){
    res.send('Welcome to my favorite movies')
});
app.get('/movies', function(req, res){
    res.json(topMovies)
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('something is wrong');
});

//listening for request
app.listen(8080, () => 
console.log('this is listening on port 8080')
);