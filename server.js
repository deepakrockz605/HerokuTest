var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')

var app = express()

var mongoose = require('mongoose')

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json())

app.use(cors())

app.use(
    bodyParser.urlencoded({
        extended: false
    })
)


var mongoURI = "mongodb://heroku_jrns6g00:mkelsme6fk9b3enb1i55p9g60m@ds259518.mlab.com:59518/heroku_jrns6g00";

// mongodb://username:password@host:port/database?options...'
// mongodb+srv://deepak.pawar@wwindia.com:skype@123@cluster0-bk3jl.mongodb.net/test?retryWrites=true&w=majority

mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))


var Users = require('./routes/Users')

app.use('/users', Users)

app.listen(PORT, () => {
    console.log(`App Running on Port ${PORT}`)
})