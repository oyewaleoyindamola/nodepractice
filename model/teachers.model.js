const mongoose = require('mongoose');

const teachersSchema = new mongoose.Schema({
    name : {
        type: String,
        minlength: 4,
        unique: true,
        required: 'Teacher"s name is required '
    },
    course: {
        type: String,
        minlength: 4,
        required: 'course is required'
    }
})

const Teachers  = mongoose.model('Teachers', teachersSchema);

module.exports =Teachers;