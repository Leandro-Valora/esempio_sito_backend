import express, { json } from "express";
import { createConnection } from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = createConnection({
    user: 'real-home',
    host: 'mysql-real-home.alwaysdata.net',
    database: 'real-home_db',
    password: 'T3cn0|0g13'
})

//provo connessione 
db.connect((err) => {
    if(err) {
    console.log(err);
    console.log('dont worked to MYSQL');
    throw err;
    }
    });

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO signup (Name, Email, Password) VALUES (?, ?, ?)";
    const values = [req.body.name, req.body.email, req.body.password];

    db.query(sql, values, (err, data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM signup WHERE Email = ? AND Password = ?";
    const values = [req.body.email, req.body.password];

    db.query(sql, values, (err, data) => { 
        if(err) {
            return res.json("Error");
        }
        if(data.length > 0) {
            const name = data[0].Name;
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    })
})

app.listen(8081, () => {
    console.log("Listening...");
})
