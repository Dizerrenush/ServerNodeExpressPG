
import bodyParser from 'body-parser';
import express from'express';
import cors from 'cors';
import init from '@/models/init'
import { createServer } from "http";
import {Server} from "socket.io";

const main = express();
const httpServer = createServer(main);
const PORT = process.env.PORT || 5000;
const io = new Server({ /* options */ });

httpServer.listen(3000);

main.use(bodyParser.json({ limit: '50mb' }));
main.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
main.use(cors());

io.on("connection", (socket) => {
    // ...
});

io.listen(3000);
init().then(() => {
    main.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
}).catch(err => console.log('Error: ' + err));