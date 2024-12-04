"use server";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(_user1, _user2, _message) {
        this.User1 = _user1;
        this.User2 = _user2;
        this.message = _message;
        console.log("users recieved in user.ts");
        this.User1.send(JSON.stringify({
            type: "matched"
        }));
        this.User2.send(JSON.stringify({
            type: "matched"
        }));
        // this.handleRTC(this.User1, this.User2, this.message);
        //  this.msgBinder();
    }
    User.prototype.isParticipant = function (socket) {
        return socket === this.User1 || socket === this.User2;
    };
    User.prototype.msgBinder = function () {
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
    };
    User.prototype.handleRTC = function (sender, message) {
        var parsedMessage = JSON.parse(message);
        var reciever = sender === this.User1 ? this.User2 : this.User1;
        if (parsedMessage.type === "offer" || parsedMessage.type === "answer") {
            console.log("offer/answer");
            reciever.send(JSON.stringify({ type: parsedMessage.type, sdp: parsedMessage.sdp }));
        }
        else if (parsedMessage.type === "candidate") {
            reciever.send(JSON.stringify({ type: "candidate", candidate: parsedMessage.candidate }));
        }
    };
    return User;
}());
exports.default = User;
