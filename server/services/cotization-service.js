const axios = require('axios');

function cotization(req, res){

    const url = "https://www.alphavantage.co/query?";
    let myFn = "TIME_SERIES_DAILY";
    let sym = (req.body.company).toUpperCase();
    let query = `${url}function=${myFn}&symbol=${sym}&outputsize=compact&apikey=2UWJHXTSHOIQRGV2`;

    let companies = ["FB", "AAPL", "MSFT", "GOOGL", "AMZN"];
    if (companies.indexOf(sym) < 0) {
        res.status(401).json({
            ok: false,
            message: `El símbolo ${sym} no es válido`
        });
    } else {
        let lastValue, previousValue, dif, output;
        axios.get(query)
        .then(function (response) {

            let data = response.data;
            let serieName = Object.keys(data);
            let serieData = serieName.pop();
            let series = data[serieData];
            let lastDataName = Object.keys(series).shift();
            let lastDataValues = series[lastDataName];

            delete series[lastDataName];

            let previousDataName = Object.keys(series).shift();
            lastValue = Number(lastDataValues['4. close']).toFixed(2);
            let previousDataValues = series[previousDataName];
            previousValue = Number(previousDataValues['4. close']).toFixed(2);
            dif =  lastValue - previousValue;

            let salida = {
                "symbol": sym,
                "value": `${lastValue} (${lastDataName})`,
                "previous": `${previousValue} (${previousDataName})`,
                "change_percent": ( (dif)/previousValue*100 ).toFixed(2),
                "change_value": (dif).toFixed(2),
                "color_code": ( (dif) >= 0 ? "green" : "red" ),
            };

            output = {
                ok: true,
                message: salida
            };
            res.status(200).send(output);
        })
        .catch(function (error) {

          output = {
              ok: false,
              message: "Ocurrió un error al recuperar los datos: ", error
          };
          res.status(400).send(output);
        });
    }
}


module.exports = cotization;