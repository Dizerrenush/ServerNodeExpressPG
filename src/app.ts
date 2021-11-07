
import bodyParser from 'body-parser';
import express from'express';
import cors from 'cors';
import init from './models/init'
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

httpServer.listen(3000);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

init().then(() => {
    app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
}).catch(err => console.log('Error: ' + err));