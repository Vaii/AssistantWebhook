'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');

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

            let rawdata = fs.readFileSync('response.json');
            let response = JSON.parse(rawdata);
            console.log(response);

            var arrayLen = response.payload.google.richResponse.items.length;

            for(var i = 0, len = arrayLen; i < len; i++ ){
                response.payload.google.richResponse.items[i].simpleResponse.textToSpeech = String(JSON.parse(data).main.temp);
                console.log(response.payload.google.richResponse.items[i])
            }


            res.send(response);
        });

    }).on("error", (err) => {
        console.log(err);
        res.send(null, "something went wrong")
    });

});

server.listen((process.env.PORT || 8000), ()=>{
    console.log("Server is up and running...")
});