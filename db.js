const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/ppt_db');
const chalk = require('chalk');
const { STRING, INTERGER, DATE } = Sequelize;

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
    name: {
        type: STRING
    }
});

Souvenir.belongsTo(Person);

Souvenir.belongsTo(Place);

Souvenir.belongsTo(Thing);


const syncAndSeed = async() => {
    await db.sync({ force: true });
    const [ moe, larry, lucy, ethel, paris, chicago, london, foo, bar, bazz, quq ] = await Promise.all([
        Souvenir.create({ name: 'Ethel', name: 'Paris', name: 'bazz' }),
        Souvenir.create({ name: 'Moe', name: 'Chicago', name: 'quq' }),
        Souvenir.create({ name: 'Larry', name: 'London', name: 'foo' }),
        Souvenir.create({ name: 'Lucy', name: 'New York', name: 'bar' })
    ])
};

module.exports = {
    db,
    syncAndSeed,
    models: {
        Person,
        Place,
        Thing
    }
};