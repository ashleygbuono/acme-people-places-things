const { db, syncAndSeed, models: { Person, Place, Thing, Souvenir } } = require('./db');
const chalk = require('chalk');
const pg = require('pg');
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', async (req, res, next) => {
    try {
        const people = await Person.findAll();
        const places = await Place.findAll();
        const things = await Thing.findAll();
        const souvenirs = await Souvenir.findAll({
            include: [
                Person,
                Place,
                Thing
            ]
        });

        res.send(`
          <html>
            <head>
            
            </head>
            <body>
                <h1>Enter Purchase</h1>
                <form method = 'POST'>
                  <select name='personId'>
                  ${
                      people.map(( person ) =>`
                        <option value='${ person.id }'>${person.name}</option>
                      `).join('')
                  }
                  </select>
                  <select name='thingId'>
                  ${
                      things.map(( thing ) =>`
                        <option value='${ thing.id }'>${thing.name}</option>
                      `).join('')
                  }
                  </select>
                  <select name='placeId'>
                  ${
                      places.map(( place ) =>`
                        <option value='${ place.id }'>${place.name}</option>
                      `).join('')
                  }
                  </select>
                  <input type = 'text' name = 'count' label = 'count' />
                  <input type = 'text' name = 'date' label = 'date' />
                  <button>Save</button>
                  </form>

                  <h1>Souvenirs</h1>
                  ${
                      souvenirs.map(( souvenir ) =>`
                        <p>
                        ${ souvenir.person.name } purchased ${ souvenir.thing.name } (${ souvenir.count })
                        @ ${ souvenir.place.name }
                        on ${ souvenir.date }
                        </p>
                      `).join('')
                  }
            </body>
          </html>
        `);
    }
    catch (err) {
        next(err);
    }
});

app.post('/', async(req, res, next) => {
    try {
        const souvenir = await Souvenir.create(req.body);
        res.redirect('/');
    }
    catch (err) {
        next(err);
    }
});

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