
import bodyParser from 'body-parser';
import express from'express';
import cors from 'cors';
import init from './models/init'
import clientRoute from "./routes/clientRoute";
import feedbackRoute from "./routes/feedbackRoute";

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin: process.env.CORS_ORIGIN
};


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors(corsOptions));
//TODO constant
app.use("/api/v1", clientRoute);
app.use("/api/v1", feedbackRoute);

init().then(() => {
    app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
}).catch(err => console.log('Error: ' + err));