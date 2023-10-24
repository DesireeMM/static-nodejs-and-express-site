// requiring files for import
const express = require('express');
const data = require('data.json');

// setting up app and static route
const app = express();
app.use('/static', express.static('public'));

// set view engine to pug
app.set('view engine', 'pug');

// create basic routes
app.get('/', (req, res, next) => {
    // render the "Home" page with locals set to data.projects
});

app.get('/about', (req, res, next) => {
    // render the "About" page
});

app.get('/projects/:id', (req, res, next) => {
    // render custom project template based on id
    // be sure to add locals with the data to be passed
});

// start server on port 3000
app.listen(3000, () => {
    console.log('The app is running on port 3000!')
})