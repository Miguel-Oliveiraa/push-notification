const express = require("express");
const webPush = require("web-push");
const fs = require("fs");
const https = require("https");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3001; // Use a variável de ambiente PORT
const domain = process.env.APP_URL || "0.0.0.0";
console.log(domain);

// Chaves VAPID
const vapidKeys = webPush.generateVAPIDKeys();

webPush.setVapidDetails(
  `https://${domain}`,
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const app = express();

// CORS
app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors());
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/push/publicKey", (req, res) => {
  res.send(vapidKeys.publicKey);
});

app.post("/push/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
});

app.post("/push/sendNotification", async (req, res) => {
  const { subscription } = req.body;

  const payload = JSON.stringify({ title: "Push Test" });
  setTimeout(() => {
    webPush
      .sendNotification(subscription, payload)
      .then(() => {
        res.status(201).json({});
      })
      .catch((error) => {
        console.log(subscription);
        console.log(payload);
        console.error(error);
        res.status(500).json({});
      });
  }, 100);
});

// Inicializar o servidor HTTPS
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor HTTPS rodando em http:0.0.0.0:${port}`);
});
