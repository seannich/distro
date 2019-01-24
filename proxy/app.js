const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const port = 3000;

const corsOptions = {
    methods: ['GET', 'POST'],
    allowHeaders: ['Accept', 'Accept-Language', 'Content-Language', 'Content-Type'],
};

// Enable CORS for all routes
app.use(cors(corsOptions));

app.use('/', (req, res) => {
    const url = req.url.substring(2);
    req.pipe(request(url)).pipe(res);
});

app.listen(port);
