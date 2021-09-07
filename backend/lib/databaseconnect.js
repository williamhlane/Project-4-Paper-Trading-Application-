var Sequelize =require('sequelize');
const user = "stockU";
const password = "stockP";
const host = "localhost";
const port = "3306";
const database = "stocks";
const db = new Sequelize(`mysql://${user}:${password}@${host}:${port}/${database}`);
try {
    db.authenticate();
} catch (error) {
    console.log(error);
}
module.exports = db;