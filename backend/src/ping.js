const cron = require('cron');
const https = require('https');
require('dotenv').config();

const backendUrl = process.env.SERVER_URL;
const ping = new cron.CronJob('*/14 * * * *', function () {
    console.log('pinging server');

    https.get(backendUrl, (res) => {
        if(res.statusCode == 200){
            console.log('server pinged');
        }
        else{
            console.error('failed to ping server: ' + res.statusCode);
        }
    }).on('error', (err) => {
        console.error('error during ping: ' + err.message);
    });
}, {
    start: false
});

module.exports = ping;