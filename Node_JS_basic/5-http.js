const http = require('http');
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

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 200;

  const { url } = req;

  if (url === '/') {
    res.end('Hello Holberton School!');
  } else if (url === '/students') {
    const databasePath = process.argv[2];

    countStudents(databasePath)
      .then(({ totalStudents, studentGroups }) => {
        let responseText = 'This is the list of our students\n';
        responseText += `Number of students: ${totalStudents}\n`;

        Object.entries(studentGroups).forEach(([field, group]) => {
          const firstNames = group.map((student) => student.firstname).join(', ');
          responseText += `Number of students in ${field}: ${group.length}. List: ${firstNames}\n`;
        });

        res.end(responseText.trim());
      })
      .catch((err) => {
        res.end(`This is the list of our students\n${err.message}`);
      });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

app.listen(1245);

module.exports = app;
