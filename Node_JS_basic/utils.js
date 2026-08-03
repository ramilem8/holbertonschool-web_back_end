import fs from 'fs';

function readDatabase(fayl) {
  return new Promise((resolve, reject) => {
    fs.readFile(fayl, (xeta, melumat) => {
      if (xeta) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const setirler = melumat.toString('utf-8').split('\n');
      const netice = {};

      for (let i = 1; i < setirler.length; i += 1) {
        const setir = setirler[i];

        if (setir.trim().length !== 0) {
          const hisseler = setir.split(',');

          if (hisseler.length === 4) {
            const ad = hisseler[0];
            const sahe = hisseler[3];

            if (!netice[sahe]) {
              netice[sahe] = [];
            }

            netice[sahe].push(ad);
          }
        }
      }

      resolve(netice);
    });
  });
}

export default readDatabase;
