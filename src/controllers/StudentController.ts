import { Request, Response } from 'express';
import { students, getStudent, addStudent, validateTotalWeight } from '../models/StudentsModel';

function getAllStudents(req: Request, res: Response): void {
  res.json(students);
}

function createNewStudent(req: Request, res: Response): void {
  console.log(`\nPOST api/students`);
  console.log(JSON.stringify(req.body, null, 2));

  const studentData = req.body as NewStudentRequest; // Assign `req.body` as a `NewStudentRequest`

  const didAddStudent = addStudent(studentData); // Call the `addStudent` function using the student's data
  if (!validateTotalWeight(studentData.weights)) {
    res.sendStatus(400); // 400 Bad Request - The weight total is not 100
    return;
  }

  if (!didAddStudent) {
    // If the student's data was not added successfully
    res.sendStatus(409); // Responds with status 409 (This means 409 Conflict)
    return; // return from the function
  }

  res.sendStatus(201); // Send status 201 (This means 201 Created)
}

function getStudentByName(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParams; // Assign `req.params` as a `StudentNameParams`;
  const student = getStudent(studentName); // get the student's data using function imported from StudentModel

  if (!student) {
    console.log(`\n${studentName} was not in the dataset.`);
    // If `student` is undefined
    res.sendStatus(404); // respond with status 404 (Which means 404 Not Found)
    return; // return immediately
  }
  res.json(student); // Respond with the student's information as json
}

// Make sure this is the last line of your file
export default { getAllStudents, createNewStudent, getStudentByName };
