const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
      calName: {type:String,required:true},
      calURL: {type:String,required:true},
      public: {type:Boolean,required:true},
      creatorEmail: {type:String}
    });

const Calendar = mongoose.model('Event',calendarSchema);

module.exports = Calendar;