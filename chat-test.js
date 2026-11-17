
const { io } = require("socket.io-client");

const URL = "http://localhost:5000";

const aryan = io(URL, {
    auth: { token: process.env.ARYAN_TOKEN }
});

const rohan = io(URL, {
    auth: { token: process.env.ROHAN_TOKEN }
});

let connected = 0;

function checkConnections() {
    connected++;

    if (connected === 2) {
        console.log("Both users connected!");

        aryan.emit("send_message", {
            message: "Hey Rohan, backend is ready!"
        });

        rohan.emit("send_message", {
            message: "Great! Real-time chat is working!"
        });
    }
}

aryan.on("connect", () => {
    console.log("Aryan connected:", aryan.id);
    checkConnections();
});

rohan.on("connect", () => {
    console.log("Rohan connected:", rohan.id);
    checkConnections();
});

aryan.on("receive_message", (data) => {
    console.log("Aryan received:", data);
});

rohan.on("receive_message", (data) => {
    console.log("Rohan received:", data);
});

aryan.on("connect_error", (error) => {
    console.log("Aryan connection error:", error.message);
});

rohan.on("connect_error", (error) => {
    console.log("Rohan connection error:", error.message);
});

// Close clients after receiving messages
let received = 0;

function finish() {
    received++;

    if (received === 4) {
        aryan.disconnect();
        rohan.disconnect();
        console.log("Chat testing completed!");
    }
}

aryan.on("receive_message", finish);
rohan.on("receive_message", finish);
