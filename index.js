'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const server = express();
server.use(bodyParser.urlencoded({
    extended:true
}));

server.use(bodyParser.json());

server.post('/assistant', (req, res) =>{

    var citytoSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.City ? req.body.result.parameters.City : 'Eindhoven';
    console.log(req.query.City)
    res.send("hallo" + citytoSearch)
});

server.listen((process.env.PORT || 8000), ()=>{
    console.log("Server is up and running...")
});