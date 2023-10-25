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

// stop favicon triggering error handler
app.get("/favicon.ico", (req, res) => res.status(204).end());

// error handling
app.use((req, res, next) => {
    const err = new Error("Uh oh, I can't find what you're looking for.");
    err.status = 404;
    next(err)
});

app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status = 404;
        console.log(err.message);
        res.render('page-not-found', {err})
    } else {
        err.message = err.message || "Oh no! Something went wrong.";
        res.status = err.status || 500;
        console.log(err.message);
        res.render('error', {err})
    }
})

// start server on port 3000
app.listen(3000, () => {
    console.log('The app is running on port 3000!')
})