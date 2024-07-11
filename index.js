const { faker } = require('@faker-js/faker');

const mysql = require("mysql2");

const express = require("express");
const app = express();
const path = require("path");
app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const port = 3030;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'learnsql',
    password: 'ranajihariom@1'
});

//GET - fetch & show total number of users our app

app.get('/', (req, res) => {

    let query = `select count(*) from user`;

    try {

        connection.query(query, (error,result) => {

            if (error) {
                res.send(error);
            }
                console.log("query is working properly");
                console.log(result[0]["count(*)"]);
                // let {count} = result[0]["count(*)"];
                // res.render("home.ejs",{count});
                let count = [];
                count[0] = result[0]["count(*)"];
                res.render("home.ejs",{count});
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})


app.listen(port, () => {

    console.log(`server is listening to the port : ${port}`);

});
// let createRandomUser = () => {

//     return [
//         faker.datatype.uuid(),
//         faker.internet.userName(),
//         faker.internet.email(),
//         faker.internet.password(),
//     ];
// }
// connection.end();
