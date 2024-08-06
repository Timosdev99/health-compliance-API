const express = require('express')
const cors = require('cors')
require('dotenv').config()
const Router = express.Router()
 const cloudinary = require('cloudinary').v2
 const  multer = require('multer')
 const User = require('../MODELS/user')
 const blog = require('../MODELS/Blog')


 cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
 })


 storage = multer.memoryStorage()
 const upload = multer({storage: storage})


   Router.post('/uploadprofile', upload.single('myimage'), async (req, res) => {
    const file = req.file
  
    const { userid } = req.body;
    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    const existingUser = await User.findById(userid);
    if(!existingUser){
      return res.status(400).json({ error: 'No user found' });
    }
  
  
    cloudinary.uploader.upload_stream({resource_type :'auto'}, async (error , result) =>{
      // res.send(result);
      if (error) {
          console.error('Cloudinary Upload Error:', error);
          return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
        }
  
          existingUser.profilePic = result.secure_url;
  
          await existingUser.save();
      res.json({ imageUrl: result.url, message: 'Profile picture uploaded successfully'});
  
  
    }).end(file.buffer)
  


   })

   Router.post('/uploadblogphoto', upload.single('myimage'), async (req, res) => {
    const file = req.file
  
    const { userid } = req.body;
    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    const existingUser = await blog.findById(userid);
    if(!existingUser){
      return res.status(400).json({ error: 'No user found' });
    }
  
  
    cloudinary.uploader.upload_stream({resource_type :'auto'}, async (error , result) =>{
      // res.send(result);
      if (error) {
          console.error('Cloudinary Upload Error:', error);
          return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
        }
  
          existingUser.blogpic = result.secure_url;
  
          await existingUser.save();
      res.json({ imageUrl: result.url, message: 'Profile picture uploaded successfully'});
  
  
    }).end(file.buffer)
  


   })


 module.exports = Router