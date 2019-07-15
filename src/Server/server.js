const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express(); //initialize express

const PORT = process.env.port;

const SELECT_ALL_BETS_QUERY = "SELECT * FROM bets";

const connection = mysql.createConnection({
    host: "http://www.woistluis.moodlions.de",
    user: "d02f0948",
    password: "*databaseforwoistluis#",
    database: "d02f0948"
});

connection.connect(err => {
    if (err) {
        return err;
    }
});

app.use(cors());

app.get("/", (req, res) => {
    res.send("go to /bets to see products")
});

app.get("/bets", (req, res) => {
    connection.query(SELECT_ALL_BETS_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
});

app.get("/bets/add", (req, res) => {
    const {name, bet, count1, count2, type} = req.query;
    // const INSERT_BET = `INSERT INTO markers (id, name, address, lat, lng, type) VALUES ('2, ${name}, ${bet}, ${count1}, ${count2}, ${type}')`;
    const INSERT_BET = `INSERT INTO markers (name, address, lat, lng, type) VALUES("${name}", "${bet}", 99, 88, "test3")`;
    connection.query(INSERT_BET, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.send("succesfully added your bet")
        }
    })
});

app.listen(4000, () => {
    console.log(`I'm listening to port ${PORT}`)
});