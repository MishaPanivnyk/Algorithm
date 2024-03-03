const fs = require("fs");

function readStudentsFromFile(filename) {
  try {
    const data = fs.readFileSync(filename, "utf8");
    return data.trim().split("\n");
  } catch (err) {
    console.error(`Помилка при зчитуванні файлу ${filename}: ${err}`);
    return [];
  }
}

function readTopicsFromFile(filename) {
  try {
    const data = fs.readFileSync(filename, "utf8");
    return data.trim().split("\n");
  } catch (err) {
    console.error(`Помилка при зчитуванні файлу ${filename}: ${err}`);
    return [];
  }
}

const students = readStudentsFromFile("students.txt");
const topics = readTopicsFromFile("topics.txt");

if (topics.length < students.length) {
  console.error("Кількість тем менша за кількість студентів");
  process.exit(1);
}

function removeTopic(topic) {
  const index = topics.indexOf(topic);
  if (index !== -1) {
    topics.splice(index, 1);
  }
}

function assignRandomTopic(student) {
  const randomIndex = Math.floor(Math.random() * topics.length);
  const topic = topics[randomIndex];
  removeTopic(topic);
  return `${student}: ${topic}`;
}

function saveResultsToFile(filename, data) {
  try {
    fs.writeFileSync(filename, data.join("\n"));
    console.log(`Результати збережено у файлі ${filename}`);
  } catch (err) {
    console.error(`Помилка при збереженні у файл ${filename}: ${err}`);
  }
}

const assignments = [];
let remainingStudents = students.length;

console.log(
  "Для присвоєння теми студенту, введіть + (плюс). Для завершення введіть exit."
);

process.stdin.on("data", function (data) {
  const input = data.toString().trim();
  if (input === "+") {
    if (remainingStudents === 0) {
      console.log("Всі студенти вже отримали теми.");
      return;
    }
    const student = students.pop();
    const assignment = assignRandomTopic(student);
    assignments.push(assignment);
    remainingStudents--;
    console.log(
      `${assignment}. Залишилось студентів без теми: ${remainingStudents}`
    );
  } else if (input === "exit") {
    saveResultsToFile("assignments.txt", assignments);
    process.exit(0);
  } else {
    console.log(
      'Невірна команда. Введіть "+" для присвоєння теми студенту або "exit" для завершення.'
    );
  }
});
