const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const courses = require('./model/courses.model');
const teachers = require('./model/teachers.model')

const app = express();
dotenv.config();

const { ObjectId } = require('mongoose').Types;

// Middleware
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Welcome to my trying to understand this whole thingy');
// });


// app.get('/courses', (req, res) => {
//     res.send(courses);
// });

app.post('/courses', async (req, res) => {
    try {
        const existingCourse = await courses.findOne({ coursetitle: req.body.coursetitle });
        console.log(existingCourse)
        if (existingCourse) { res.status(404).send('Course already exists.'); }
        else {
            const course = {
                coursetitle: req.body.coursetitle,
                courseDetails: req.body.courseDetails,
            };
            const newCourse = new courses(course)
            await newCourse.save();
            return res.status(200).send(newCourse);
        }
    } catch (error) {
        res.send(error)
    }
});

app.post('/teachers', async (req, res) => {
    try {
        const { name, course } = req.body
        const existingTeachers = await teachers.findOne({name});
        if (existingTeachers) 
        return res.status(404).send('Teacher already exists');
        const newTeacher = new teachers({ name, course })
        await newTeacher.save()
        res.status(200).send(newTeacher)
    } catch (error) {
        res.send(error)
        res.status(500).send('An error occurred while updating the teacher');
    }
});
// app.patch('/courses/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { coursetitle, courseDetails } = req.body;
//         if (!ObjectId.isValid(id)) {
//             return res.status(400).send('Invalid course ID');
//         }
//         const updatedCourse = await courses.findByIdAndUpdate(
//             new ObjectId(id),
//             { coursetitle, courseDetails },
//             { new: true, runValidators: true }
//         );
//         if (!updatedCourse) {
//             return res.status(404).send('Course not found');
//         }
//         res.status(200).send({ message: 'Course updated successfully', course: updatedCourse });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred while updating the course');
//     }
// });
// app.patch('/teachers/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, course } = req.body;
//         if (!ObjectId.isValid(id)) {
//             return res.status(400).send('Invalid teacher ID');
//         }
//         const updatedTeacher = await teachers.findByIdAndUpdate(
//             new ObjectId(id),
//             { name, course },
//             { new: true, runValidators: true }
//         );
//         if (!updatedTeacher) {
//             return res.status(404).send('Teacher not found');
//         }
//         res.status(200).send({ message: 'Teacher updated successfully', teacher: updatedTeacher });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred while updating the teacher');
//     }
// });
// app.delete('/courses/delete/:id', async (req, res) => {

//     try {
//         const { id } = req.params;

//         if (!ObjectId.isValid(id)) {
//             return res.status(400).send('Invalid course ID');
//         }
//         const deletedCourse = await courses.findByIdAndDelete(
//             new ObjectId(id),
//         );
//         if (!deletedCourse) {
//             return res.status(404).send('Course not found');
//         }
//         res.status(200).send({ message: 'Course deleted successfully' });
//     }
//     catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred while updating the teacher');
//     }

// });
// app.delete('/teachers/delete/:id', async (req, res) =>{
//     try {
//         const {id} = req.params;

//         if(!ObjectId.isValid(id)) {
//             return res.status(400).send('Invalid course ID'); 
//         };
//         const deletedTeacher = await teachers.findByIdAndDelete(
//             new ObjectId(id),
//         );
//         if(!deletedTeacher) {
//             return res.status(404).send('Teacher not found')
//         }
//         res.status(200).send({ message: 'Teacher deleted successfully'})

//     } catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred while updating the teacher');
//     } 
// })

// app.get('/courses/:id', (req, res) => {
//     const course = courses.find(course => course.id ===req.params.id);
//         if (!course) res.status(404).send('Course not found')
//     res.send(course);
// });

// app.put('/courses/:id', (req, res) => {
//     const course = courses.find(course => course.id ===req.params.id);
//         if (!course) res.status(404).send('Course not found')


//     const { id } = req.params;
//     course.coursetitle = req.body.coursetitle;
//     course.courseDetails = req.body.courseDetails;
//     res.send(course);

// });

const CONNECTION_STRING = process.env.CONNECTION_STRING
mongoose.connect(CONNECTION_STRING)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
