const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/ppt_db');
const chalk = require('chalk');


const syncAndSeed = async() => {
    await db.sync({ force: true });
};

module.exports = {
    db,
    syncAndSeed
};