import express, { Express } from 'express'; // Import express
import StudentController from './controllers/StudentController'; // Import functions from StudentController

// Create your app object
const app: Express = express();
const PORT = 8092;

// Activate json parsing for the request body
app.use(express.json());
app.post('/api/students', StudentController.createNewStudent);
app.get('/api/students/:studentName', StudentController.getStudentByName);
app.get('/api/students/:studentName/finalExam', StudentController.getFinalExamScores);
app.post('/api/students/:studentName/finalExam', StudentController.calcFinalScore);
app.post('/api/students/:studentName/grades/:assignmentName', StudentController.updateGrade);
// Start listening on the chosen port

app.listen(PORT, () => {
  // anonymous function , arrow function
  console.log(`Server listerning on http://localhost:${PORT}`);
});
