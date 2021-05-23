const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    fs = require('fs'),
    cors = require('cors'),
    routers = require('./routes/routes.js');
const port = 3001;

const app=express();

app.use('/list', express.static(path.join(__dirname, 'html/index.html')));
app.use('/edit_tour', express.static(path.join(__dirname, 'html/edit_tour_form.html')));
app.use('/add_tour', express.static(path.join(__dirname, 'html/add_tour_form.html')));
app.use('/add_site', express.static(path.join(__dirname, 'html/add_site_form.html')));


app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routers);

const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});