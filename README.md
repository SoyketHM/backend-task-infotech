# Exact Time Email
> This is a nodejs scheduling app using express.js and cron.
# Introduction
Sending email in same time at user individual time zone is a challenging task and resource heavy. For sending email in exact time in different timezone we can use the tool already we have without making the wheels again. To do this we need a scheduler but should we write our own scheduler? No we should not because we have Cron. Using cron job we can define when we need to execute some task in this case some email. When we use cron we have the control of seconds, minutes, hours, days and month and weeks. 
# How It Works
In my solution I use node package cron which has excellent support for cron job and time zone. 

First I read the timezones.json file with readFile method where I get all the time zone I need.
```node
const readFile = () => {
  return new Promise((resolve, reject) => {
    return fs.readFile('timezones.json', {
      encoding: 'utf8'
    }, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    })
  })
};
```

Then on sendEmail method I read all the timezone and creating cron for each time zone using cronTrigger method.
cronTrigger method is dynamic method. Parameters of cronTrigger method (cronTime, onTick, timezone) provide from sendEmail method.
```node
const cronTrigger = (cronTime, onTick, timezone) => {
    new cron(cronTime, ()=> {onTick(timezone)}, undefined, true, timezone);
};
```

# How to run
npm install
npm start
#### serve run with localhost:5000
