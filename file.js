const { writeFile, mkdir } = require('fs');
const { tmpdir } = require('os');
const { join } = require('path');

const destDir = join(tmpdir(), 'monDossier');
let counter = 0;
const messages = [];
const pushFile = (filename, numFiles) => {
  return new Promise( (resolve, reject) => {
    mkdir(destDir, () => {
      const interval = setInterval(() => {
        counter++;
        const filenameToCreate = join(destDir, `${filename}_${counter}.txt`);
        const content = `Contenu du fichier ${filename} ${counter}`;
        const message = `Chemin du fichier qui vient d'être créer : ${filenameToCreate}`;
        writeFile(filenameToCreate, content, (err) => { 
          if(err) reject(err);   
          messages.push(message); 
          if (numFiles === counter) {
            resolve(messages);
            clearInterval(interval);
          }
        });
      }, 1000);
    });
  });
}

module.exports = { pushFile };


