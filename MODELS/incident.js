const mongoose = require('mongoose')

const incidentschema = new mongoose.Schema({
   name: { type: String, required: true },
    complain: { type: String, required: true,  },
    location: { type: String, required: true }
}, 
{timestamps: true}
)


const user = mongoose.model('incident', incidentschema)

module.exports = user