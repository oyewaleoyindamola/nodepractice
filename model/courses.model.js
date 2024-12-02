const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    coursetitle :{
        type: String,
        minlenght: 4,
        required: 'course title is required'
    },
    courseDetails :{
        type: String,
        minlenght: 4,
        required: 'course details is required'
    }
});

const Course = mongoose.model('Course', courseSchema)

module.exports = Course;