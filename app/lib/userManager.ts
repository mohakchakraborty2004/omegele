import { WebSocket } from "ws";
import User from "./user";
import { json } from "stream/consumers";



class userManager {
   private meetings : User[]
   private users: WebSocket[]
   private Nextusers : WebSocket[]

 //  private WaitingUser : WebSocket | null

   constructor() {
    this.meetings = [];
    this.users = [];
    this.Nextusers = [];
   // this.WaitingUser = null
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
       this.Match(socket)
     } else if(parsedMessage.type === "leave") {
       socket.close();
       this.users =  this.users.filter(item => item !== socket);
      
     }
     
   }

 


   public Match( socket : WebSocket){
    // if queue check whether queue is not empty
    if(this.Nextusers.length != 0){
        // if queue , grab the 1st user from it (done)
        const FirstUserInWaiting  = this.Nextusers.shift();

        if (FirstUserInWaiting){
          const user = new User(FirstUserInWaiting, socket);
          this.meetings.push(user);
        }
        // after matching pop it from queue (done)
       // this.WaitingUser = null; 
    }
    else {
        // add the user here if he's the first one , but he will probably be not the first one 
       // add a check logic if the socket exists in the queue already.
        this.Nextusers.push(socket)
    }
   }
}