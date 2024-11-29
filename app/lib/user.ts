import { WebSocket } from "ws";

interface msg {
  action? : string,
  type? : string
  sdp? : any,
  candidate? : any
}

class User {
    private User1 : WebSocket 
    private User2 : WebSocket
    private message : string

    constructor (_user1 : WebSocket , _user2 : WebSocket, _message: string) {
        this.User1 = _user1 
        this.User2 = _user2
        this.message = _message

        console.log("users recieved in user.ts");

       // this.handleRTC(this.User1, this.User2, this.message);
     //  this.msgBinder();
    }

    public isParticipant(socket : WebSocket) : boolean{
     return socket === this.User1 || socket === this.User2
    }

    private msgBinder() {
      console.log("msgBinder");
      
        // this.User1.on("message",(message) => {
        //   const parsedMessage : msg = JSON.parse(message.toString());
        //   console.log(parsedMessage);

        //     this.handleRTC(this.User1, this.User2, message.toString());
        // } );

        // this.User2.on("message", (message)=> {
        //   const parsedMessage : msg = JSON.parse(message.toString());
        //   console.log(parsedMessage);

        //   this.handleRTC(this.User2, this.User1, message.toString());
        // });
      
    }

    public handleRTC(sender : WebSocket, message : string){
      
      const parsedMessage : msg = JSON.parse(message);
      const reciever = sender === this.User1 ? this.User2 : this.User1


      if(parsedMessage.type === "offer" || parsedMessage.type === "answer"){
         console.log("offer/answer")
          reciever.send(JSON.stringify({type: parsedMessage.type, sdp : parsedMessage.sdp}))
        
      } else if(parsedMessage.type === "candidate"){
          reciever.send(JSON.stringify({type: "candidate", candidate : parsedMessage.candidate}))
      } 

    }


}

export default User