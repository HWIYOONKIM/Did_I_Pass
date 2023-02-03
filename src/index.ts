import express, { Express } from 'express'; // Import express
import StudentController from './controllers/StudentController'; // Import functions from StudentController

// Create your app object
const app: Express = express();
const PORT = 8091;

// Activate json parsing for the request body
app.use(express.json());

// Register your route handlers for the specified endpoints
app.post('/api/students', StudentController.createNewStudent);
app.get('/api/students/:studentsName', StudentController.getStudentByName);
// Start listening on the chosen port
app.listen(PORT, () => {
  // anonymous function , arrow function
  console.log(`Server listerning on http://localhost:${PORT}`);
});
