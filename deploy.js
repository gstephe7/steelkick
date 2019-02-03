const process = require('child_process');
const fs = require('fs');

const devUrl = 'http://localhost:8080'
const proUrl = 'https://steelkick-backend.appspot.com'

let data = fs.readFileSync('./src/api/api.js', 'utf-8');

let file = data.toString();

if (file.includes(devUrl)) {
  let newFile = file.replace(devUrl, proUrl);
  fs.writeFileSync('./src/api/api.js', newFile);
}

process.execSync('npm run build', {
  stdio: 'inherit'
});

process.execSync('gsutil rsync -r -d ./dist gs://www.steelkick.com', {
  stdio: 'inherit'
});
