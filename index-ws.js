const express = require("express");
const server = require("http").createServer();

const app = express();

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);
server.listen(3000, () => {
  console.log("[Server is listening on port 3000]");
});

/* Websocket begins */

const WebsocketServer = require("ws").Server;

const wss = new WebsocketServer({ server: server });

wss.on("connection", (conn) => {
  const numberOfClients = wss.clients.size;

  console.log("Client Connected", numberOfClients);

  wss.broadcast(`Current Visitors ${numberOfClients}`);

  if (conn.readyState === conn.OPEN) {
    conn.send("[Welcome to my server]");
  }

  conn.on("close", () => {
    wss.broadcast(`Current Visitors ${numberOfClients}`);
    console.log("Client disonnected");
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    client.send(data);
  });
};
