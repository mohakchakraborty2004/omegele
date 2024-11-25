import { WebSocket } from "ws";
import User from "./user";
import { json } from "stream/consumers";



class userManager {
   private meetings : User[]
   private users: WebSocket[]
   private Nextusers : WebSocket[]

   private WaitingUser : WebSocket | null

   constructor() {
    this.meetings = [];
    this.users = [];
    this.Nextusers = [];
    this.WaitingUser = null
   }

   public addUser(socket : WebSocket) {
     this.users.push(socket);
   }

   public handleMessage (socket : WebSocket, message : string){
     const parsedMessage = JSON.parse(message);

     if(parsedMessage.type === "match"){
        this.Match(socket);
     } 
     else if (parsedMessage.type === "next"){

     }
     
   }

   public UnMatch(socket : WebSocket){
     // logic for exiting the room in User Class
     

     // probably add the user to waiting user 

     // make the waiting user as queue 

   }


   public Match( socket : WebSocket){
    // if queue check whether queue is not empty
    if(this.WaitingUser){
        // if queue , grab the 1st user from it 
        const user = new User(this.WaitingUser, socket);
        // after matching pop it from queue
        this.meetings.push(user);
        this.WaitingUser = null; 
    }
    else {
        // add the user here if he's the first one , but he will probably be not the first one 
        this.WaitingUser = socket;
    }
   }
}