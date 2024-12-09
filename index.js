const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const courses = require('./model/courses.model');
const {Teachers, teachersSchema} = require('./model/teachers.model');
const projects = require('./model/project.model');
const {Students, studentSchema} = require('./model/students.model')

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

// app.post('/courses', async (req, res) => {
//     try {
//         const existingCourse = await courses.findOne({ coursetitle: req.body.coursetitle });
//         console.log(existingCourse)
//         if (existingCourse) { res.status(404).send('Course already exists.'); }
//         else {
//             const course = {
//                 coursetitle: req.body.coursetitle,
//                 courseDetails: req.body.courseDetails,
//             };
//             const newCourse = new courses(course)
//             await newCourse.save();
//             return res.status(200).send(newCourse);
//         }
//     } catch (error) {
//         res.send(error)
//     }
// });

app.post('/teachers', async (req, res) => {
    try {
        const { name, course } = req.body
        const existingTeachers = await Teachers.findOne({name});
        if (existingTeachers) 
        return res.status(404).send('Teacher already exists');
        const newTeacher = new Teachers({ name, course })

        const allowedCourses = teachersSchema.path('course').options.enum;
        if(!allowedCourses.includes(course)) {
            return res.status(400).send(`${course} is not a valid course`);
        }
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
//         const updatedTeacher = await Teachers.findByIdAndUpdate(
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
//         const deletedTeacher = await Teachers.findByIdAndDelete(
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

app.post('/courses', async (req, res) => {
    try {
        const existingCourse = await courses.findOne({ coursetitle: req.body.coursetitle});
        if(existingCourse) res.status(404).send('Course already exists')
            const course = {
                coursetitle: req.body.coursetitle, 
                courseDetails: req.body.courseDetails
            };
            const newCourse = new courses(course)
            await newCourse.save();
            console.log(newCourse)
            return res.status(200).send(newCourse)
    } catch (error) {
        res.send(error)
    }
});

app.post('/projects', async (req, res) => {
    try {
        const existingProject = await projects.findOne({projectName: req.body.projectName});
        if(existingProject)
        return res.status(404).send('Project already exists')
        const project = {
            projectName: req.body.projectName,
            company: req.body.company,
            dueDate: req.body.dueDate
        }
        const newProject = new projects(project)
        await newProject.save()
        return res.status(200).send(newProject)
    } catch (error) {
        res.send(error)
        res.status(500).send('An error occurred while updating the project');
    }
});
app.get('/projects', async (req, res) => {
    const project = await projects.find()
    if(!project)res.status(404).send('projects not found')
        res.status(200).send({
            responseCode: 200,
            message: 'Projects found',
            data: project
    });
});
app.put('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params
        const {projectName, company, dueDate} = req.body
        if (!ObjectId.isValid(id)) {
            return res.status(400).send('Invalid project ID');
        }
        const updatedProject = await projects.findByIdAndUpdate(
            new ObjectId(id),
            {projectName, company, dueDate},
            {new: true, runValidators: true}
        );
        if(!updatedProject)
        { return res.status(404).send('Project not found')

        }
        res.status(200).send({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating the project');
    } 
});
app.delete('/projects/delete/:id', async (req, res) => {
    try {
        const {id} = req.params;
        if(!ObjectId.isValid(id)) {
        return res.status(400).send('Invalid course ID'); 
        };
        const deletedProject = await projects.findByIdAndDelete(
            new ObjectId(id),
        );
        if(!deletedProject) {
            return res.status(200).send({
                message: 'Project deleted successfully'  });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating the teacher');
    }
});
app.post('/students', async (req, res) => {
    try {
        const { firstName, lastName, email, grade, gender } = req.body;
        const test = { firstName, lastName, email, grade, gender };

        // Check if student already exists
        const existingStudent = await Students.findOne({ email });
        if (existingStudent) {
            return res.status(404).send('Student already exists');
        }

        const newStudent = new Students(test);

        // Retrieve allowed grade values from schema
        const allowedGrades = studentSchema.path('grade').options.enum;
        if (!allowedGrades.includes(grade)) {
            return res.status(400).send(`${grade} is not a valid grade`);
        }

        // Retrieve allowed gender values from schema
        // Check gender validity
        if (newStudent.gender === "Male" || newStudent.gender === "Female") {
            await newStudent.save();
            return res.status(200).send({
                responseCode: 200,
                message: 'Student created',
                data: newStudent,
            });
        } else {
            return res.status(400).send(newStudent.gender + " is not a valid gender");
        }

    } catch (error) {
        res.status(500).send({
            responseCode: 500,
            message: 'Internal server error',
            error: error.message,
        });
    }
});



const CONNECTION_STRING = process.env.CONNECTION_STRING
mongoose.connect(CONNECTION_STRING)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
