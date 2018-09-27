const checkWeather = function (arg, callback,){


    const http = require('http');

    let data = '';


    http.get('http://api.openweathermap.org/data/2.5/weather?q=' + arg +'&units=metric&appid=004f84a325e90cf982bfb35ddc63c3f5', (resp) => {


        resp.on('data', (chunk) => {
            data += chunk;
        });


        resp.on('end', () => {
            callback(JSON.parse(data))
        });

    }).on("error", (err) => {
        callback(null, "something went wrong");
    });



};

exports.helloWorld = (req , res) => {

    checkWeather("weert",  function(data) {

            res.send(String(data.main.temp));
    }
)};
