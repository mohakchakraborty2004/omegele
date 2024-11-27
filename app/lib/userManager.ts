import { WebSocket } from "ws";
import User from "./user";
import { json } from "stream/consumers";

interface msg {
  action? : string,
  type? : string
  sdp? : any,
  candidate? : any
}


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
     const parsedMessage : msg = JSON.parse(message);

     if(parsedMessage.action === "match"){
        this.Match(socket, message);
     } 
     else if (parsedMessage.action === "next"){
       this.Match(socket, message)
     } else if(parsedMessage.action === "leave") {
       socket.close();
       this.users =  this.users.filter(item => item !== socket);
      
     }
     
   }

 


   public Match( socket : WebSocket , message: string){
    // if queue check whether queue is not empty(done)
    if(this.Nextusers.length != 0){
        // if queue , grab the 1st user from it (done)
        const FirstUserInWaiting  = this.Nextusers.shift();

        if (FirstUserInWaiting){
          const user = new User(FirstUserInWaiting, socket, message);
          // user.handleRTC(FirstUserInWaiting,socket, message );
          this.meetings.push(user);
        }
        // after matching pop it from queue (done)
       // this.WaitingUser = null; 
    }
    else {
       // add the user here if he's the first one , but he will probably be not the first one (done)
       // add a check logic if the socket exists in the queue already.
        this.Nextusers.push(socket)
    }
   }
}

export default userManager;