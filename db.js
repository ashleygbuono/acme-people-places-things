const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/ppt_db');
const chalk = require('chalk');
const { STRING, INTEGER, DATE } = Sequelize;

const Person = db.define('person', {
    name: {
        type: STRING,
        allowNull: false
    }
});

const Place = db.define('place', {
    name: {
        type: STRING,
        allowNull: false
    }
});

const Thing = db.define('thing', {
    name: {
        type: STRING,
        allowNull: false
    }
});

const Souvenir = db.define('souvenir', {
    count: {
        type: INTEGER,
        defaultValue: 2
    },
    date: DATE
});

Souvenir.belongsTo(Person);

Souvenir.belongsTo(Place);

Souvenir.belongsTo(Thing);

const data = {
    people: ['moe', 'larry', 'lucy', 'ethel'],
    places: ['paris', 'nyc', 'chicago', 'london'],
    things: ['foo', 'bar', 'bazz', 'quq']
  };

const syncAndSeed = async() => {
    await db.sync({ force: true });
 
    const moe = await Person.create({name: 'moe'});
    await Person.create({name: 'lucy'});
    await Person.create({name: 'larry'});
    await Person.create({name: 'ethel'});

    const nyc = await Place.create({name: 'NYC'});
    await Place.create({name: 'Chicago'});
    await Place.create({name: 'LA'});
    await Place.create({name: 'Dallas'});

    const foo = await Thing.create({name: 'foo'});
    await Thing.create({name: 'bar'});
    await Thing.create({name: 'bazz'});
    await Thing.create({name: 'quq'});

    await Souvenir.create({ personId: moe.id, placeId: nyc.id, thingId: foo.id, number: 3,date: new Date()});
 
 
    // const people = Promise.all(data.people.map( name => Person.create({ name })));
    // const places = Promise.all(data.places.map( name => Place.create({ name })));
    // const things = Promise.all(data.things.map( name => Thing.create({ name })));

    // await Souvenir.create({ personId: ethel.id, placeId: paris.id, thingId: bazz.id });
    // await Souvenir.create({ personId: moe.id, placeId: chicago.id, thingId: quq.id });
    // await Souvenir.create({ personId: larry.id, placeId: london.id, thingId: bar.id });
    // await Souvenir.create({ personId: lucy.id, placeId: nyc.id, thingId: foo.id });
};

module.exports = {
    db,
    syncAndSeed,
    models: {
        Person,
        Place,
        Thing,
        Souvenir
    }
};