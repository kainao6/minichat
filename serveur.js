"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("ws"));
const clients = [];
const port = 3000;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname });
});
app.get("/clientws.js", (req, res) => {
    res.sendFile("clientws.js", { root: __dirname });
});
const serveur = http_1.default.createServer(app);
const webSokect = new ws_1.default.WebSocketServer({ server: serveur });
webSokect.on("connection", (ws) => {
    clients.push(ws);
    ws.on("message", (msg) => {
        if (msg.toString().startsWith("nom=")) {
            ws.nom = msg.toString().substring(4);
            for (let client of clients) {
                client.send(ws.nom + " a rejoint le Chat ");
            }
        }
        else {
            for (let client of clients) {
                client.send(ws.nom + " dit " + msg);
            }
        }
    });
});
serveur.listen(port, () => { console.log(`serveur en écoute sur le port ${port}`); });
