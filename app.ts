
import bodyParser from 'body-parser';
import express from'express';
import cors from 'cors';

//Database Connection
import db from "./src/database/connect";
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors("*"));

const PORT = process.env.PORT || 5000;
db.sync().then(() => {
    app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error: " + err));