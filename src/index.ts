
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import init from "./models/init"

const index = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin: process.env.CORS_ORIGIN
};
const version = process.env.API_VERSION || '1';
const baseRoute = '/api/v' + version;
const dataSize = '50mb';

init().then(([clientRoute, feedbackRoute]) => {
    index.use(bodyParser.json({limit: dataSize}));
    index.use(bodyParser.urlencoded({extended: true, limit: dataSize}));
    index.use(cors(corsOptions));
    index.use(baseRoute + "/client", clientRoute);
    index.use(baseRoute + "/feedback", feedbackRoute);
    index.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}).catch(err => console.log('Error: ' + err));