import express from "express";
import http from "http";
import ws from "ws";

declare module "ws" {
    interface WebSocket {
        nom?: string;
    }
}

const clients: ws.WebSocket[] = [];
const port = 3000;
const app = express();

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname });
})

app.get("/clientws.js", (req, res) => {
    res.sendFile("clientws.js", { root: __dirname });
})

const serveur = http.createServer(app);
const webSokect = new ws.WebSocketServer({ server: serveur });

webSokect.on("connection", (ws: ws.WebSocket) => {
    clients.push(ws);
    ws.on("message", (msg: ws.RawData) => {
        if (msg.toString().startsWith("nom=")) {
            ws.nom = msg.toString().substring(4);
            for (let client of clients) {
                client.send(ws.nom + " a rejoint le Chat ");
            }
        } else {
            for (let client of clients) {
                client.send(ws.nom + " dit " + msg);
            }
        }
    })
})

serveur.listen(port, () => { console.log(`serveur en écoute sur le port ${port}`) });