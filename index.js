const { faker, tr } = require('@faker-js/faker');

const mysql = require("mysql2");
const { v4: uuidv4 } = require('uuid');
const express = require("express");
const app = express();

const path = require("path");

const methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
    console.log(id);

    let query = 'SELECT * FROM user WHERE id = ?';

    try {
        connection.query(query, [id], (error, result) => {
            if (error) {
                console.log(error);
                res.sendStatus(500); // Added to handle errors properly
            } else {
                res.render("edit.ejs", { user: result[0] });
                console.log(result);
            }
        });
    } catch (error) {
        res.sendStatus(500);
    }
});

//update route

app.patch('/user/:id', (req, res) => {

    let { id } = req.params;
    let q = `select * from user where id = '${id}'`;

    try {
        connection.query(q, (error, result) => {

            if (error) {
                res.sendStatus(500);
                console.log("error occured");
                return;
            }
            let user = result[0];
            let { username: newUsername, password: formpassword } = req.body;
            if (formpassword != user.password) {
                res.send("wrong password entered.Try again!");
            } else {
                let q2 = `update user set username = '${newUsername}' where id= '${id}'`;
                connection.query(q2, (error, result) => {

                    if (error) {
                        res.send(error);
                        console.log(error);
                        return;
                    }
                    res.redirect('/user');
                })
            }
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});

//view user
app.get('/user/:id/data', (req, res) => {

    let { id } = req.params;
    let query = `select * from user where id = '${id}'`;

    try {
        connection.query(query, (error, result) => {

            if (error) {

                res.send("error occured");
                return;
            }
            let data = result[0];
            console.log(data);
            res.render("data.ejs", { data });
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
})
//delete user

app.delete('/user/:id', (req, res) => {

    let { id } = req.params;
    let query = `delete * from user where id = '${id}'`;

    try {
        connection.query(query, (error, result) => {

            if (error) {
                res.send("unable to delete");
                return;
            }
            let user = result[0];
            res.send(`user ${user.username} deleted`);
            console.log(user);
        })
    } catch (error) {
        res.send(error);
        console.log(error);
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
