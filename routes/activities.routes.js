const express = require('express');
const router = express.Router();
const uploader = require("../config/cloudinary.config.js");

const Activity =require('../models/Activity.model');

router.get("/activities", async (req, res, next) => {
    const allActivities =  await Activity.find()
    
    res.render("activities/activities", {activities : allActivities});
  });

  router.get('/create' , async(request ,  response) =>{
    try{
        response.render("activities/new-activity")
    }
    catch (error) {
        console.log(error)
    }
})

router.post('/create',uploader.single("imageUrl"), async(req , res) => {
    try{
    let activityInfo = req.body
    activityInfo.materials = activityInfo.materials.split(",");
    activityInfo.skills = activityInfo.skills.split(",");
    activityInfo.steps = activityInfo.steps.split(",");
    console.log(activityInfo)
    if (req.file) {
        activityInfo.image = req.file.path;
      }

   
    
    const newActivity = await Activity.create(activityInfo)
    res.redirect("/activities/activities")
   } catch (error){
    console.log(error)
   }
    
})

router.get('/:activityId', async (req , res) =>{
    try{
        const activityId = req.params.activityId
        console.log(activityId)
        const activityDetails = await Activity.findById(activityId)
        console.log(activityDetails)
        res.render("activities/activity-details", {activity : activityDetails})
    }
    catch (error){
        console.log(error)
    }
})

module.exports = router;