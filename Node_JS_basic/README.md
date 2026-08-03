# Node JS Basics

## Task 8: Organize a complex HTTP server using Express

Server code is split into `full_server`:

- `full_server/utils.js` — `readDatabase(fayl)` reads the CSV database asynchronously and resolves an object mapping each field to an array of student first names.
- `full_server/controllers/AppController.js` — `AppController.getHomepage` returns `Hello Holberton School!`.
- `full_server/controllers/StudentsController.js` — `StudentsController.getAllStudents` and `StudentsController.getAllStudentsByMajor` read the database and build the student list responses.
- `full_server/routes/index.js` — links `/`, `/students`, and `/students/:major` to the controllers.
- `full_server/server.js` — Express app listening on port 1245, exports the app.

## Setup

```
npm install
```

## Run

```
npm run dev
```

The database file path is passed as an argument, so run from the project root:

```
nodemon --exec babel-node --presets babel-preset-env ./full_server/server.js ./database.csv
```

## Test

```
curl localhost:1245
curl localhost:1245/students
curl localhost:1245/students/CS
curl localhost:1245/students/SWE
```
