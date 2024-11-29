"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
var userManager = /** @class */ (function () {
    //  private WaitingUser : WebSocket | null
    function userManager() {
        this.meetings = [];
        this.users = [];
        this.Nextusers = [];
        // this.WaitingUser = null
    }
    userManager.prototype.addUser = function (socket) {
        this.users.push(socket);
        console.log("user added");
    };
    userManager.prototype.handleMessage = function (socket, message) {
        var parsedMessage = JSON.parse(message);
        var activeUser = this.meetings.find(function (meeting) { return meeting.isParticipant(socket); });
        if (activeUser) {
            activeUser.handleRTC(socket, message);
        }
        if (parsedMessage.action === "match") {
            console.log("match accessed");
            this.Match(socket, message);
        }
        else if (parsedMessage.action === "next") {
            this.Match(socket, message);
        }
        else if (parsedMessage.action === "leave") {
            socket.close();
            this.users = this.users.filter(function (item) { return item !== socket; });
        }
    };
    userManager.prototype.Match = function (socket, message) {
        // if queue check whether queue is not empty(done)
        if (this.Nextusers.length != 0) {
            // if queue , grab the 1st user from it (done)
            var FirstUserInWaiting = this.Nextusers.shift();
            if (FirstUserInWaiting) {
                var user = new user_1.default(FirstUserInWaiting, socket, message);
                // user.handleRTC(FirstUserInWaiting,socket, message );
                this.meetings.push(user);
            }
            console.log("users matched");
            // after matching pop it from queue (done)
            // this.WaitingUser = null; 
        }
        else {
            // add the user here if he's the first one , but he will probably be not the first one (done)
            // add a check logic if the socket exists in the queue already.
            console.log("first user");
            this.Nextusers.push(socket);
        }
    };
    return userManager;
}());
exports.default = userManager;
