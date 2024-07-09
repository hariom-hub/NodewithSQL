const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");

const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodewithsql',
    password: "ranajihariomj@1"
});

connection.query("SHOW TABLES", (err, result) => {
    if (err) {
        console.error('Error showing tables:', err);
        return;
    }   
    console.log(result);
});

connection.end();
let createRandomUser = () => {
    return {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate({ min: 1900, max: 2000 }).toISOString().split('T')[0], // Format as YYYY-MM-DD
        registeredAt: faker.date.past().toISOString().split('T')[0], // Format as YYYY-MM-DD
    };
}

console.log(createRandomUser());
