const mongoose = require('mongoose');
// const { default: doctor } = require('../client/src/reducers/doctorReducer');
const Schema = mongoose.Schema;

const doctorSchema = new Schema ({
   _id: {
      type: String
   },

   name: {
      type: String,
      required: true  
   },
   image: {
        type: String,
      //   required: true,
       // unique: true
    },

   category: {
      type: String,
      required: true  
   },

   description: {
      type: String,
      required: true
   },

   fee: {
      type: String,
      required: true
   },

   education: {
      type: String,
   },
   exp: {
      type: String,
      required: true
   },
   specialization: {
      type: String,
   },
   servicesOffered: {
      type: String,
   },
 
   phone: {
        type: String,
        required: true
      //  unique: true
     },

   address: {
        type: String,
        required: true
     },
     feedbacks: {
      type: Array,
      required: true
   },
     takenAppointments: {
      type: Array,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   
  },
  recommendations: {
   type: String,
   default:"0"
  },

});

module.exports = doctor = mongoose.model('doctor details', doctorSchema);