require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.DB_NAME
}).then( () =>{
    console.log('connected to database successfuly')
}
).catch(
    err => console.log(err.message)
)