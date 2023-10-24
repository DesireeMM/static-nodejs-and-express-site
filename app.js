// requiring files for import
const express = require('express');
const data = require('./data.json');

// setting up app and static route
const app = express();
app.use('/static', express.static('public'));

// set view engine to pug
app.set('view engine', 'pug');

// create basic routes
app.get('/', (req, res, next) => {
    res.render('index', {projects: data.projects})
});

app.get('/about', (req, res, next) => {
    res.render('about');
});

app.get('/projects/:id', (req, res, next) => {
    const {id} = req.params;
    const project = data.projects[id];
    if (!project) {
        const err = new Error("Sorry, that project doesn't exist yet.");
        err.status = 404;
        return next(err);
    }
    res.render('project', {project});
});

// error handling
app.use((req, res, next) => {
    const err = new Error('Page not found.');
    err.status = 404;
    next(err)
});

app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status = 404;
        // render not found template, pass in err
        res.send(`<h1>404 error: ${err.message}</h1>`)
    } else {
        err.message = err.message || "Oh no! Something went wrong.";
        res.status = err.status || 500;
        // render global error template, pass in err
        res.send(`<h1>${err.status} - ${err.message}</h1>`)
    }
})

// start server on port 3000
app.listen(3000, () => {
    console.log('The app is running on port 3000!')
})