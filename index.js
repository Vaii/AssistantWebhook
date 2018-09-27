'use strict';


const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {

    const agent = new WebhookClient({ request, response });


    const checkWeather = function (arg, callback,){


        const http = require('http');

        let data = '';


        http.get('http://api.openweathermap.org/data/2.5/weather?q=' + arg +'&units=metric&appid=004f84a325e90cf982bfb35ddc63c3f5', (resp) => {


            resp.on('data', (chunk) => {
                data += chunk;
            });


            resp.on('end', () => {
                callback(JSON.parse(data).min.temp)
            });

        }).on("error", (err) => {
            callback(null, "something went wrong");
        });



    };

    function getWeather(agent){

        var city = agent.parameters.City;

        checkWeather(city, function(data){
            agent.add(String(data));
        })
    }

    let intentMap = new Map();
    intentMap.set('Weather', getWeather);
    agent.handleRequest(intentMap);
});


//
// exports.helloWorld = (req , res) => {
//
//     checkWeather("weert",  function(data) {
//
//             res.send(String(data.main.temp));
//     }
// )};
