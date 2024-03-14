const fs = require("fs");
const readline = require("readline");

function readStudentsFromFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const students = data.trim().split("\n");
      resolve(students);
    });
  });
}

function readTopicsFromFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const topics = data.trim().split("\n");
      resolve(topics);
    });
  });
}

function writeResultsToFile(results) {
  return new Promise((resolve, reject) => {
    fs.writeFile("results.txt", results.join("\n"), "utf8", (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

async function assignTopics() {
  try {
    const students = await readStudentsFromFile("students.txt");
    const topics = await readTopicsFromFile("topics.txt");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const assigned = [];

    console.log(
      'Початок зв\'язування студентів і тем. Натисніть "+" для назначення теми студенту або будь-яку іншу клавішу для завершення.'
    );

    rl.on("line", (input) => {
      if (input === "+") {
        if (topics.length === 0) {
          console.log("Немає більше тем для назначення.");
          return;
        }

        const studentIndex = Math.floor(Math.random() * students.length);
        const topicIndex = Math.floor(Math.random() * topics.length);

        const student = students[studentIndex];
        const topic = topics[topicIndex];

        assigned.push(`${student}: ${topic}`);
        console.log(`${student}`);
        console.log(`Отримав тему: ${topic}`);
        students.splice(studentIndex, 1);
        console.log(`Залишилось ${students.length} студентів без теми.`);
        topics.splice(topicIndex, 1);
      } else {
        rl.close();
      }
    });

    rl.on("close", async () => {
      await writeResultsToFile(assigned);
      console.log(
        'Зв\'язування завершено. Результати збережено в файлі "results.txt".'
      );

      process.exit(0);
    });
  } catch (err) {
    console.error("Сталася помилка:", err);
  }
}

// Запускаємо головну функцію
assignTopics();
