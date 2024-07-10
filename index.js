const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'learnsql',
    password: 'ranajihariom@1'
});

let createRandomUser = () => {

    return [
        faker.datatype.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ];
}

let query = "INSERT INTO user  (id,username,email,password) VALUES ?";

let users = [];
for (let i = 0; i < 10; i++) {
    users.push(createRandomUser());
}

connection.query(query, [users], (err, result) => {
    if (err) {
        console.error('Error showing tables:', err);
        return;
    }
    console.log(result);
});

connection.end();

