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

    res.send("hallo")
});

server.listen((process.env.PORT || 8000), ()=>{
    console.log("Server is up and running...")
});