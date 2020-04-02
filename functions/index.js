const functions = require('firebase-functions');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const basicInfo = require('./modules/bot_info');
const msgAcessFunction = require('./modules/mesages_acess');
const token = '';
const bot = new TelegramBot(token, { polling: true });
const app = express();



//to acess the messages sent to the bot
msgAcessFunction(bot);


app.get('/basicinfo', async (req, res) => {
    var fetchData = await basicInfo(bot);
    console.log(fetchData);
    res.send(fetchData);
});

app.get('/infos', async (req, res) => {
    var fetchData = await basicInfo(bot);
    console.log(fetchData);
    res.send(fetchData);
});


exports.app = functions.https.onRequest(app);