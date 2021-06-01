const { db, syncAndSeed, models: { Person, Place, Thing } } = require('./db');
const chalk = require('chalk');


const express = require('express');

const app = express();

// app.get('/', (req, res, next) => {

// });

// app.post('/')

// app.delete('/')


const start = async() => {
    try {
        await syncAndSeed();
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(chalk.magentaBright(`Listening on port ${port}`)));
    }
    catch (err) {
        console.log(err);
    }
};

start();