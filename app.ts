
import express from 'express';
import { cors } from 'cors'

const db = require("./app/models");
const PORT = process.env.PORT || 8080;

const app = express();

var corsOptions = {
    origin: `http://localhost:8081`
};

app.use(cors(corsOptions));

// application/json
app.use(express.json());

// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})
db.sequelize.sync();
app.listen(PORT, () => console.log('listening on port ' + PORT));