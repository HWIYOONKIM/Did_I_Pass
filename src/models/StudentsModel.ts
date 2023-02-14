const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  let average = 0;
  const noFinalTotal = 100 - weights.finalExamWeight;
  for (const score of weights.assignmentWeights) {
    average += score.weight * score.grade;
  }
  average /= noFinalTotal;
  return average;
}

function validateTotalWeight(weights: CourseGrades): boolean {
  let total = 0;
  for (const score of weights.assignmentWeights) {
    total += score.weight;
  }
  total += weights.finalExamWeight;
  if (total !== 100) {
    return false;
  }
  return true;
}
function addStudent(newStudentData: NewStudentRequest): boolean {
  // Destructure the name and weights
  const { name, weights } = newStudentData;

  // the the name is already in `students`
  // then return false
  if (name in students) {
    return false;
  }

  // Calculate the student's current average (use the function previously defined)
  const currentAverage: number = calculateAverage(weights);

  const newStudent: Student = { name, weights, currentAverage }; // Create a `Student` object using the `name`, `weights` and `currentAverage`

  // Add the new Student to the `students` object. The student's name is the key

  students[name] = newStudent;
  // Finally, return true since the student was added
  return true;
}

function getStudent(studentName: string): Student | undefined {
  // If the student's name is not in `students`
  // then return undefined
  if (!(studentName in students)) {
    return undefined;
  }
  return students[studentName];
  // Return the student's information (their name is the key for `students`)
}

function calculateFinalExamScore(
  currentAverage: number,
  finalExamWeight: number,
  targetScore: number
): number {
  // TODO: Calculate the final exam score needed to get the targetScore in the class
  const score =
    (targetScore - currentAverage * (1 - finalExamWeight * 0.01)) / (finalExamWeight * 0.01);
  return score;
}

function getLetterGrade(score: number): string {
  // TODO: Return the appropriate letter grade
  if (score >= 90) {
    return 'A';
  }
  if (score >= 80) {
    return 'B';
  }
  if (score >= 70) {
    return 'C';
  }
  if (score >= 60) {
    return 'D';
  }
  if (score > 100 || score < 0) {
    return 'Invalid Score';
  }
  return 'F';
}

function updateStudentGrade(
  studentName: string,
  assignmentName: string,
  newGrade: number
): boolean {
  // TODO: Get the student's data from the dataset
  const student = getStudent(studentName);
  // TODO: If the student was not found
  // TODO: return false
  if (!student) {
    console.log(`\n${student} was not in the dataset.`);
    return false;
  }

  const assignment = student.weights.assignmentWeights.find(
    (assignmentWeight) => assignmentWeight.name === assignmentName
  ); // TODO: Search the student's `assignmentWeights` and find the assignment with the matching name using the .find() method

  // TODO: If the assignment was not found
  // TODO: return false
  if (!assignment) {
    console.log(`\n${assignment} was not in the dataset.`);
    return false;
  }

  // TODO: Set the assignment's grade to the newGrade
  assignment.grade = newGrade;

  // TODO: Then recalculate the student's currentAverage
  student.currentAverage = calculateAverage(student.weights);

  // TODO: return true since the update completed successfully
  return true;
}
export {
  students,
  addStudent,
  getStudent,
  validateTotalWeight,
  calculateFinalExamScore,
  getLetterGrade,
  updateStudentGrade,
};
