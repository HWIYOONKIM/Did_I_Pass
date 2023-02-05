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

export { students, addStudent, getStudent, validateTotalWeight };
