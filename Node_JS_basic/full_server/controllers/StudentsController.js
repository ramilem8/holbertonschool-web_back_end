import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    const faylYolu = process.argv[2];

    readDatabase(faylYolu)
      .then((melumat) => {
        let cavab = 'This is the list of our students\n';
        const sahələr = Object.keys(melumat).sort(
          (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()),
        );

        for (let i = 0; i < sahələr.length; i += 1) {
          const sahe = sahələr[i];
          const adlar = melumat[sahe];

          cavab += `Number of students in ${sahe}: ${adlar.length}. List: ${adlar.join(', ')}\n`;
        }

        response.status(200).send(cavab.trim());
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    const faylYolu = process.argv[2];

    readDatabase(faylYolu)
      .then((melumat) => {
        const adlar = melumat[major] || [];

        response.status(200).send(`List: ${adlar.join(', ')}`);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
