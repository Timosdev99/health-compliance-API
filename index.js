const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const PORT  = 3000
const app = express()
require('dotenv').config()
require('./db')

const authroute = require('./route/authroute')
const incidentroute = require('./route/incidentroute')
const profile = require('./route/profile')
app.use(bodyparser.json())
const healthblog = require('./route/healthblog')
app.use(cors())

app.use('/user', authroute)
app.use('/user', incidentroute)
app.use('/user', profile)
app.use('/user', healthblog)

app.listen( PORT,
    () => {
            console.log(`server runing on port ${PORT}`)
    }
)