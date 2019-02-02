const process = require('child_process');

process.exec('npm run build', (err, stdout, stderr) => {
  process.exec('gsutil rsync -r -d ./dist gs://www.steelkick.com');
});
