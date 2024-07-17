const express = require('express')
const Router = express.Router()
const jwt = require('jsonwebtoken')
const incident = require('../MODELS/incident')
const bcrypt = require('bcrypt')  
const auth = require('../middleware/auth')



Router.post('/report', auth, async(req, res) => {
      try {
       const { name, complain, location} = req.body
       
       const newincident = new incident({
        name, 
        complain, 
        location
       })
       
       await newincident.save()

       res.status(200).json({
        message: "complain sent succcesfully"
       })

      } catch (err) {
        res.status(500).json({
            message: err.message
        })
      }
})


Router.get('/getincident', auth, async(req, res) => {
  try {
    const {complain} = req.body
const getincident = await incident.find({complain})

if(!getincident) {
  res.status(500).json({
    message: "no complain found"
  })
}

res.status(200).json({
  message: "succesfully gotten", 
  getincident
})

    
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})


Router.get('getincidentbyid')

module.exports = Router