
const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

// Listen for chat messages
eventEmitter.on("messageSent", (data) => {
    console.log(
        `[${data.room}] ${data.username}: ${data.message}`
    );
});

// Listen for user connections
eventEmitter.on("userConnected", (data) => {
    console.log(`User connected: ${data.username}`);
});

// Listen for room joins
eventEmitter.on("roomJoined", (data) => {
    console.log(
        `${data.username} joined room ${data.room}`
    );
});

module.exports = eventEmitter;
