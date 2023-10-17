require('dotenv').config()

const express = require('express')
const Routes = require('./Routes')

const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use('/', Routes)

mongoose.connect(process.env.URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Database Connected and liostening on port : ', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })