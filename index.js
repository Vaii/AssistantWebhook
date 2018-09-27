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

    var citytoSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.City ? req.body.queryResult.parameters.City : 'Eindhoven';

    let data = '';
    http.get('http://api.openweathermap.org/data/2.5/weather?q=' + citytoSearch +'&unit=metric&appid=004f84a325e90cf982bfb35ddc63c3f5', (resp) => {


        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            console.log(JSON.parse(data).main.temp);
            console.log(citytoSearch);
            res.send(JSON.parse(data).main.temp);
        });

    }).on("error", (err) => {
        console.log(err)
        res.send(null, "something went wrong")
    });

});

server.listen((process.env.PORT || 8000), ()=>{
    console.log("Server is up and running...")
});