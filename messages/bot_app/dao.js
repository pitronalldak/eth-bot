var pgp = require('pg-promise')();

// Database connection details;
var cn = {
    host: 'ec2-54-247-99-159.eu-west-1.compute.amazonaws.com',
    port: 5432, // 5432 is the default;
    database: 'd60bfacka1csvl',
    user: 'ljegtiillsqasp',
    password: 'e060963f9ba619dbaa8962e694deab7a0fb1ec2e1c1defff2f1d48f7739a3c04',
    ssl: true
};

var db = pgp(cn);
//
// function createUser(userId) {
//     console.log(userId);
//      db.one('INSERT INTO telegram_users(${this~}) VALUES(${userId)})', {userId});
// };

function createUser(userId) {
    db.tx(function (t) {
        // t = this;
        return this.one("insert into telegram_users(userId) values($1) returning id", userId)
    })
}

module.exports = createUser;

function createSubscription(userId, address) {
    db.tx(function (t) {
        // t = this;
        return this.one("insert into eth_addresses(userId, address) values($1, $2) returning id", [userId, address])
    })
}

module.exports = createSubscription;

function createSubscription(userId, address) {
    db.tx(function (t) {
        // t = this;
        return this.one("insert into eth_addresses(userId, address) values($1, $2) returning id", [userId, address])
    })
}

module.exports = createSubscription;

function checkAddress(address) {
    return (
        db.tx(t => {
            return t.one("select from eth_addresses where address=$1", [address])
        })
    )
}
module.exports = checkAddress;