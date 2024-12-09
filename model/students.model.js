const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 4,
        required: 'first name is required'
    },

    lastName: {
        type: String,
        minlength: 4,
        required: 'last name is required'
    },
    email: {
        type: String,
        unique: true,
        required: 'email is required'
    },
    grade: {
       type: String,
       enum: ["Jss1", "Jss2","Jss3", "Ss1","Ss2", "Ss3"],
        required: 'class is required'
    },
    gender: {
        type: String,
        enum:['Male', 'Female'],
        required: 'gender is requireed'
    }
});

const Students = mongoose.model('Student', studentSchema);

module.exports = { Students, studentSchema }