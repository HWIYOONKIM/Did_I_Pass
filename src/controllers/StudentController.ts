import { Request, Response } from 'express';
import {
  students,
  getStudent,
  addStudent,
  validateTotalWeight,
  calculateFinalExamScore,
  getLetterGrade,
  updateStudentGrade,
} from '../models/StudentsModel';

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

function getFinalExamScores(req: Request, res: Response): void {
  // TODO: Get the student name from the path params
  const { studentName } = req.params as StudentNameParams;
  // TODO: Get the student's data from the dataset
  const student = getStudent(studentName);
  // TODO: If the student was not found
  // TODO: responds with status 404 Not Found
  // TODO: terminate the function
  if (!student) {
    console.log(`\n${studentName} was not in the dataset.`);
    res.sendStatus(404);
    return;
  }
  // TODO: Get the current average and weights from the student's data
  const { currentAverage } = student;
  const { weights } = student;
  const { finalExamWeight } = weights;
  // TODO: Calculate the grade needed on the final to score a 90 in the class (this is the grade needed for an A)
  const neededForA = calculateFinalExamScore(currentAverage, finalExamWeight, 90);
  // TODO: Calculate the grade needed on the final to score a 80 in the class (this is the grade needed for a B)
  const neededForB = calculateFinalExamScore(currentAverage, finalExamWeight, 80);
  // TODO: Calculate the grade needed on the final to score a 70 in the class (this is the grade needed for a C)
  const neededForC = calculateFinalExamScore(currentAverage, finalExamWeight, 70);
  // TODO: Calculate the grade needed on the final to score a 60 in the class (this is the grade needed for a D)
  const neededForD = calculateFinalExamScore(currentAverage, finalExamWeight, 60);

  const finalExamScores: FinalExamScores = {
    neededForA,
    neededForB,
    neededForC,
    neededForD,
  };
  // TODO: Send a JSON response with an object containing the grades needed for an A through D
  res.json(finalExamScores);
}

function calcFinalScore(req: Request, res: Response): void {
  // TODO: Get the student name from the path params
  const { studentName } = req.params as StudentNameParams;
  // TODO: Get the student's data from the dataset
  const student = getStudent(studentName);
  // TODO: If the student was not found
  // TODO: responds with status 404 Not Found
  // TODO: terminate the function
  if (!student) {
    console.log(`\n${studentName} was not in the dataset.`);
    res.sendStatus(404);
    return;
  }

  // TODO: Get the grade data from the request body as the `AssignmentGrade` type
  const assignmentGrade = req.body as AssignmentGrade;
  // TODO: Get the current average and weights from the student's data
  const { currentAverage } = student;
  const { weights } = student;
  const { finalExamWeight } = weights;
  const { grade } = assignmentGrade;
  const gradeCalc = currentAverage * (100 - finalExamWeight) * 0.01;
  const finalCalc = grade * finalExamWeight * 0.01;
  const overallScore = gradeCalc + finalCalc; // TODO: Calculate the final score that would receive using their current average and the hypothetical final exam grade.
  const letterGrade = getLetterGrade(overallScore); // TODO: Get the letter grade they would receive given this score

  // TODO: Send back a JSON response containing their `overallScore` and `letterGrade.
  res.json({ overallScore, letterGrade });
}

function updateGrade(req: Request, res: Response): void {
  // TODO: Get the student's name and assignment name from the path parameters as a `GradeUpdateParams`
  const { studentName, assignmentName } = req.params as GradeUpdateParams;

  // TODO: Get the grade from the request body as an `AssignmentGrade`
  const studentGrade = req.body as AssignmentGrade;
  // TODO: Update the student's grade
  const update = updateStudentGrade(studentName, assignmentName, studentGrade.grade);
  // TODO: If the update did not complete (this means the student or the assignment wasn't found)
  // TODO: respond with status 404 Not Found
  // TODO: terminate the function immediately
  if (!update) {
    console.log(`update not complete.`);
    res.sendStatus(404);
    return;
  }

  // TODO: Respond with status 200 OK
  res.json(students);
}

// Make sure this is the last line of your file
export default {
  getAllStudents,
  createNewStudent,
  getStudentByName,
  getFinalExamScores,
  calcFinalScore,
  updateGrade,
};
