
const express = require('express');

const app = express();

app.use(express.json());

const router = require('./router/routes');


app.use('/api/genres', router);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on ${port}...`);
});