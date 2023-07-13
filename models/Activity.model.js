const { Schema, model } = require("mongoose");


const activitySchema = new Schema(
    {
      name: {
        type: String,
        trim: true,
        required: false,
        unique: true,
        lowercase: true, 
      },
      description: {
        type: String,
        required: true, 
      },
      duration: {
        type: Number,
        enum : [5,15,30,60],
        required: true
      },
      age : {
        type: [String],
        enum : ["0-1","1-2","3-4","5-6"],
        required: true
      },
      materials : {
        type: [String],
        required: true
      },
      skills : {
        type: [String],
        required: true
      },
      steps : {
        type: [String],
        required: true
      },
      image : {
        type : String,
      } 
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`    
      timestamps: true
    }
  );
  
  const Activity = model("Activity", activitySchema);
  
  module.exports = Activity;