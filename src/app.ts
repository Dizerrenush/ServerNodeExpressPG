
import bodyParser from 'body-parser';
import express from'express';
import cors from 'cors';
import init from './models/init'

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin: process.env.CORS_ORIGIN
};
const version = process.env.API_VERSION || 'v1';
const baseRoute ='/api/v' + version;
const dataSize = '50mb';

init().then(([clientRoute,feedbackRoute]) => {
    app.use(bodyParser.json({ limit: dataSize }));
    app.use(bodyParser.urlencoded({ extended: true, limit: dataSize }));
    app.use(cors(corsOptions));
    app.use(baseRoute + "/client", clientRoute);
    app.use(baseRoute + "/feedback", feedbackRoute);
    app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
}).catch(err => console.log('Error: ' + err));