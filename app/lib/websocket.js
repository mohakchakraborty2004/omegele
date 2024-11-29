"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var userManager_1 = require("./userManager");
var wss = new ws_1.WebSocketServer({ port: 8000 });
var UserManager = new userManager_1.default();
wss.on("connection", function (ws) {
    ws.on("error", function (error) {
        console.log(error);
    });
    UserManager.addUser(ws);
    ws.on("message", function (event) {
        var message = JSON.parse(event.toString());
        if (message) {
            UserManager.handleMessage(ws, event.toString());
        }
    });
});
