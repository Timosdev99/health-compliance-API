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


Router.patch('/update-report', async(req, res) => {
  try {
    const {_id} = req.body
    const updateincident = await incident.findById(_id)
    if(!updateincident) {
      res.status(500).json({
        message: "incident record not found"
      })
    }
    const { name, complain, location} = req.body
    updateincident ({
      name: name,
      complain: complain,
      location: location,
      
    })
    await updateincident.save()
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'an error occur'
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


Router.get('getincidentbyid', async(req, res) => {
  try {
    const _id = req.body
    const userbyid = await user.findById(_id)
      
    res.status(200).json({
        message: "All User gotten succesfuly",
       userbyid,
      
    })

    
} catch (err) {
  console.log(err)
    res.status(500).json({
        message: "unable to get incident"
    })
}
})

module.exports = Router