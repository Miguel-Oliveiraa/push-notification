const express = require('express');
const webPush = require('web-push');
const fs = require('fs');
const https = require('https');
const cors = require('cors');  

// Leitura dos certificados SSL autoassinados
const privateKey = fs.readFileSync('key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Chaves VAPID
console.log(webPush.generateVAPIDKeys());
const vapidKeys = {
    publicKey: 'BCKbgWsI-1Q8aS1x6g1ZUc8Shin0tjDEFnMisRUkHX6ARo7GY_onkq8W4TzW0SpE3k63hfEc_U9YgcWjaE3j0LY',
    privateKey: '_GTxJaqGRvUAGGP1xNoSAHtRUz8vdb_jfj0zYL_ODFQ'
};

webPush.setVapidDetails('mailto:youremail@example.com', vapidKeys.publicKey, vapidKeys.privateKey);

const app = express();
const port = 3001;

// Habilitar CORS
app.use(cors());

app.use(express.json());

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
https.createServer(credentials, app).listen(port, () => {
    console.log(`Servidor HTTPS rodando em https://localhost:${port}`);
});
