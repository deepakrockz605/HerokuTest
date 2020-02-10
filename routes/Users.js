const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');

const User = require('../models/Users')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.use(bodyParser.json())

users.get('/test', (req, res) => {
    res.end("Hello web Deepak V3");
});

users.post('/testpost', (req, res) => {
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }
    var data=JSON.stringify(req.body);
    res.end(data);
});

users.post('/register', (req, res) => {
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }
    var data=JSON.stringify(req.body);
    res.end(data);
});

/*users.post('/register', (req, res) => {
    debugger;
    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }

    User.findOne({
        email: req.body.email
    })

        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({ status: userData.first_name + " Your Email ID : " + user.email + 'Registred Successfully!!' })
                        })
                        .catch(err => {
                            res.send('error' + err)
                        })
                })
            }
            else {
                res.json({ error: userData.first_name + " " + 'Your Email ' + user.email + ' Exists Already' })
            }
        })
        .catch(err => {
            res.send('error' + err)
        })
})*/

users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })

                    res.json({ success: "Login Successful !!!!" })
                    res.send(token)
                }
                else {
                    res.json({ error: "Password is Incorrect !!!!" })
                }
            }
            else {
                res.json({ error: "Username is Incorrect !!!!" })
            }
        })
        .catch(err => {
            res.send('Error : ' + err)
        })
})

users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
        _id: decoded._id
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})


module.exports = users