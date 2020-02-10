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


const mongoURI = 'mongodb+srv://deepak:skype@123@cluster0-bk3jl.mongodb.net/test?retryWrites=true&w=majority'

mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))


var Users = require('./routes/Users')

app.use('/users', Users)

app.listen(PORT, () => {
    console.log(`App Running on Port ${PORT}`)
})