const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
      editKey: {type:Number},  
      calName: {type:String,required:true},
      calURL: {type:String,required:true},
      public: {type:Boolean,required:true},
      description: {type:String,required:true},
      keywords: {type:String}
    });

const Calendar = mongoose.model('Calendar',calendarSchema);

module.exports = Calendar;