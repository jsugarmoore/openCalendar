const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
      editKey: {type:String},
      calendar: {type:String,required:true},
      name: {type:String,required:true},
      venue: {type:String,required:true},
      startDate: {type:String,required:true},
      startTime: {type:String,required:true},
      endDate: {type:String,required:true},
      endTime: {type:String,required:true},
      description: {type:String,required:true},
      ageRestriction: {type:String,required:true},
      cover: {type:String,required:true},
      keywords: {type:String,required:false},
      creationDate:{type:String}
    });

const Event = mongoose.model('Event',eventSchema);

module.exports = Event;