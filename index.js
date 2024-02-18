require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const passport = require('passport')
const connectDb = require('./connectDb/connectdb')
const router = require('./router/handler')
const session = require('express-session')
const jwt = require('jsonwebtoken')


port = process.env.port

// Middileware

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload())
app.use("/uploads", express.static(__dirname + '/uploads'))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 24 * 64000}
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/v1', router)

app.listen(port, () =>{
    connectDb();
    console.log(`Server started on port ${port}`)
})