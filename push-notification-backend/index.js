const express = require('express');
const webPush = require('web-push');
const fs = require('fs');
const https = require('https');
const cors = require('cors');  
require('dotenv').config();

const port = process.env.PORT || 3001; // Use a variável de ambiente PORT
const domain = process.env.APP_DOMAIN || '0.0.0.0'

// Chaves VAPID
const vapidKeys = webPush.generateVAPIDKeys();

webPush.setVapidDetails(`https://${domain}`, vapidKeys.publicKey, vapidKeys.privateKey);

const app = express();

// Habilitar CORS
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/push/publicKey', (req, res) => {
    res.send(vapidKeys.publicKey);
});

app.post('/push/subscribe', (req, res) => {
    const subscription = req.body;
    console.log(subscription);
    res.status(201).json({});
});

app.post('/push/sendNotification', async (req, res) => {
    const { subscription }= req.body;

    const payload = JSON.stringify({ title: 'Push Test' });
    setTimeout(()=>{
        webPush.sendNotification(subscription, payload)
            .then(() => {
                res.status(201).json({});
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({});
            });
    }, 5000)
   
});

// Inicializar o servidor HTTPS
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor HTTPS rodando em http://${domain}:${port}`);
});
