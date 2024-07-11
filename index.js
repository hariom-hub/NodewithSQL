const { faker } = require('@faker-js/faker');

const mysql = require("mysql2");

const express = require("express");
const app = express();
const path = require("path");
const { error } = require('console');

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

        connection.query(query, (error, result) => {

            if (error) {
                res.send(error);
            }
            console.log("query is working properly");
            console.log(result[0]["count(*)"]);
            // let {count} = result[0]["count(*)"];
            // res.render("home.ejs",{count});

            let count = result[0]["count(*)"];
            console.log(result[0]["id"])
            res.render("home.ejs", { count });
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//show user

app.get('/user', (req, res) => {

    let query = `select * from user`;


    try {
        connection.query(query, (error, users) => {

            if (error) {
                throw error;
            }
            res.render("showUser.ejs", { users });
        })
    } catch (error) {

        console.log(error);
        res.sendStatus(500);
    }
});

//edit username

app.get('/user/:id/edit', (req, res) => {

    let { id } = req.params;
    let query = `select * from user where id = '${id}'`;
    try {
        connection.query(query, (error, result) => {

            if (error) {
                throw error;
            }
            console.log(result);
            res.render("edit.ejs", { result });
        })
    } catch (error) {
        res.sendStatus(500);
    }
    // console.log(id);
});

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
