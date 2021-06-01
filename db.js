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

const syncAndSeed = async() => {
    await db.sync({ force: true });
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