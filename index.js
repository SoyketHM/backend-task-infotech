const express   = require('express');
const fs        = require('fs');
const cron      = require('cron').CronJob;
const moment      = require('moment');
const app       = express();

// Load Middlewares
app.use(express.json());

// Read timezones.json
const readFile = () => {
    return new Promise((resolve, reject) => {
        return fs.readFile('timezones.json', {encoding: 'utf8'}, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        })
    })
};

// Trigger cron job
const cronTrigger = (user) => {
    new cron("00 46 17 12 11 *", function() {
        console.log("Tick "+ user+" "+moment().format('LLL'));
    }, undefined, true, user);
};

const sendEmail = async ()=>{
    const users = await readFile().then(data=> JSON.parse(data));

    users.map(tz => {
        console.log(`Creating corn for ${tz} at ${moment().format('LLL')}`)
        cronTrigger(tz)
    });
};
sendEmail();

// const cronTrigger = (cronTime, onTick, timezone) => {
//     new cron(cronTime, onTick, undefined, true, timezone);
// };
//
// const sendEmail = async ()=>{
//     const cronTime = "00 43 17 12 11 *";
//     const onTick = function() {
//         console.log("Tick "+  +" timezone "+moment().format('LLL'));
//     };
//     const users = await readFile().then(data=> JSON.parse(data));
//
//     users.map(tz => {
//         console.log(`Creating corn for ${tz} at ${moment().format('LLL')}`);
//         cronTrigger(cronTime, onTick(), tz);
//     });
// };

// Listen to the Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
