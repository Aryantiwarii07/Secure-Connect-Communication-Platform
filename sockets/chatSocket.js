
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const eventEmitter = require("../events/eventEmitter");

const chatSocket = (io) => {

    // Authenticate socket connections using JWT
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;

            if (!token) {
                return next(new Error("Authentication required"));
            }

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            const user = await User.findById(decoded.sub)
                .select("username role");

            if (!user) {
                return next(new Error("User not found"));
            }

            socket.user = {
                id: user._id.toString(),
                username: user.username,
                role: user.role
            };

            next();

        } catch (error) {
            next(new Error("Invalid or expired token"));
        }
    });


    io.on("connection", (socket) => {

        console.log(`User connected: ${socket.user.username}`);

        eventEmitter.emit("userConnected", {
            username: socket.user.username
        });


        // Join general chat room
        socket.join("general");

        eventEmitter.emit("roomJoined", {
            username: socket.user.username,
            room: "general"
        });


        // Send and receive messages
        socket.on("send_message", (data) => {

            if (
                !data ||
                typeof data.message !== "string" ||
                !data.message.trim() ||
                data.message.length > 1000
            ) {
                return socket.emit("chat_error", {
                    message: "Message must contain 1–1000 characters"
                });
            }

            const messageData = {
                username: socket.user.username,
                message: data.message.trim(),
                room: "general",
                time: new Date().toISOString()
            };

            // Broadcast to everyone in the room
            io.to("general").emit(
                "receive_message",
                messageData
            );

            // Trigger EventEmitter
            eventEmitter.emit("messageSent", messageData);
        });


        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.user.username}`);
        });

    });

};

module.exports = chatSocket;
