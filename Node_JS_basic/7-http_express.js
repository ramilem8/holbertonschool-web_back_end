const express = require('express');
const fs = require('fs');

const countStudents = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const fileLines = data
      .toString('utf-8')
      .trim()
      .split('\n')
      .filter((line) => line.trim().length > 0);

    const studentGroups = {};
    const dbFieldNames = fileLines[0].split(',');
    const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

    fileLines.slice(1).forEach((line) => {
      const studentRecord = line.split(',');
      const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
      const field = studentRecord[studentRecord.length - 1];

      if (!studentGroups[field]) {
        studentGroups[field] = [];
      }

      const studentEntries = studentPropNames.map(
        (propName, idx) => [propName, studentPropValues[idx]],
      );
      studentGroups[field].push(Object.fromEntries(studentEntries));
    });

    const totalStudents = Object.values(studentGroups).reduce(
      (total, group) => total + group.length,
      0,
    );

    resolve({ totalStudents, studentGroups });
  });
});

const app = express();

app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const databasePath = process.argv[2];
  res.type('text/plain');

  countStudents(databasePath)
    .then(({ totalStudents, studentGroups }) => {
      let responseText = 'This is the list of our students\n';
      responseText += `Number of students: ${totalStudents}\n`;