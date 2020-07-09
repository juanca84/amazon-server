const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("./models/user");

dotenv.config();
 
const app = express()

mongoose.connect(
    process.env.DATABASE,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    err => {
        if (err) {
            console.log(err);
        } else {
            console.log("connected to the database");
        }
    }
);

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.json("Hello amazon clone");
});

app.post("/",(req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.address = req.body.address;

    user.save((err) => {
        if (err) {
            res.json(err);
        } else {
            res.json('successfully saved')
        }
    })
});

app.listen(3000, err => {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on PORT", 3000);
    }
})
