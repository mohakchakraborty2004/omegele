import { WebSocket } from "ws";

class User {
    private User1 : WebSocket 
    private User2 : WebSocket

    constructor (_user1 : WebSocket , _user2 : WebSocket) {
        this.User1 = _user1 
        this.User2 = _user2
    }

    public DisconnectUser(socket : WebSocket){
          if(socket == this.User1){
            //disconnecting logic
          } else {
            // disconnecting logic for user 2
          }
    }
}

export default User