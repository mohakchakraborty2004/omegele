"use server";

import { WebSocketServer } from "ws";
import userManager from "./userManager";

const wss = new WebSocketServer({port : 8000});

const UserManager = new userManager();

wss.on("connection", (ws)=> {
ws.on("error", (error)=> {
    console.log(error);
})

UserManager.addUser(ws)

ws.on("message", (event)=> {
    const message =  JSON.parse(event.toString());

    if(message){
        UserManager.handleMessage(ws, event.toString());
    }
})


})