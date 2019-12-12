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
//========Static========
// // Trigger cron job
// const cronTrigger = (timezone) => {
//     new cron("00 18 20 12 11 *", function() {
//         console.log("Test Email " + timezone + " " + moment().format('LLL'));
//     }, undefined, true, timezone);
// };

// // Send email all users
// const sendEmail = async ()=>{
//     const users = await readFile().then(data=> JSON.parse(data));

//     users.map(tz => {
//         console.log(`Creating corn for ${tz} at ${moment().format('LLL')}`)
//         cronTrigger(tz)
//     });
// };
// sendEmail();

//========Dynamic========

const cronTrigger = (cronTime, onTick, timezone) => {
    new cron(cronTime, ()=> {onTick(timezone)}, undefined, true, timezone);
};

const sendEmail = async ()=>{
    const cronTime = "00 52 20 12 11 *";
    const onTick = function(timezone) {
        console.log(`Test Email ${timezone} ${moment().format('LLL')}`);
    };
    const users = await readFile().then(data=> JSON.parse(data));

    users.map(tz => {
        console.log(`Creating corn for ${tz} at ${moment().format('LLL')}`);
        cronTrigger(cronTime, onTick, tz);
    });
};
sendEmail()

// Listen to the Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
