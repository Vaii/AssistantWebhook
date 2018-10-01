'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');

const {dialogflow, Image} = require('actions-on-google');

const app = dialogflow();

const server = express();

server.use(bodyParser.urlencoded({
    extended:true
}));

server.use(bodyParser.json());

app.intent('food', conv =>{
    conv.ask(new Permission({
        context: 'To greet you personally',
        permissions: 'NAME'
    }))
})



server.post('/assistant', app)



    //let action = req.body.queryResult && req.body.queryResult.action ;
    // if(action === "getWeather"){
    //
    //     let citytoSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.City ? req.body.queryResult.parameters.City : 'Eindhoven';
    //
    //     let data = '';
    //     http.get('http://api.openweathermap.org/data/2.5/weather?q=' + citytoSearch +'&units=metric&appid=004f84a325e90cf982bfb35ddc63c3f5', (resp) => {
    //
    //
    //         resp.on('data', (chunk) => {
    //             data += chunk;
    //         });
    //
    //         resp.on('end', () => {
    //             console.log(JSON.parse(data).main.temp);
    //             console.log(citytoSearch);
    //
    //             return res.json({
    //                 fulfillmentText: "the weather in " + citytoSearch + " is " + String(JSON.parse(data).main.temp) + " degrees",
    //                 source: 'weather'
    //             });
    //         });
    //
    //     }).on("error", (err) => {
    //         console.log(err);
    //         res.send(null, "something went wrong")
    //     });
    // }else if(action === "getLocation"){
    // }else {
    //     return res.json({
    //         fulfillmentText: "ok thank you for your information",
    //         source: "food"
    //     });
    // }
server.listen((process.env.PORT || 8000), ()=>{
    console.log("Server is up and running...")
});