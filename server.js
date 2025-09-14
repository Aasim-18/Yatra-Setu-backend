import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDb from "./src/DB/db.js";
import socketHandler from "./src/socket/index.js";


dotenv.config();

const app = express();
app.use(cors(
     {
    origin: '*',
    methods: ['GET', 'POST'],

  }
));
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],

  }
});

socketHandler(io);

const PORT = process.env.PORT || 4000;
app.get('/', (req, res) => {
  res.send("Badmashi nahi mitrr");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
ConnectDb();

// import router here
import userRouter from "./src/routes/user.route.js";
import busRouter from "./src/routes/bus.route.js";


// routs declraration

app.use("/api/v1/bus", busRouter);
app.use("/api/v1/users", userRouter);
