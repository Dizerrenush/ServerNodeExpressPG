import express from 'express';

const PORT = process.env.PORT ||  8081;
const app = express();

app.get('/',(req, res) => {
    res.send('NODEMON started')
})

app.listen(PORT,()=>console.log(`server started on port ${PORT}`))