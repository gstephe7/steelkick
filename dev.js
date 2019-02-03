const fs = require('fs');

const devUrl = 'http://localhost:8080'
const proUrl = 'https://steelkick-backend.appspot.com'

let data = fs.readFileSync('./src/api/api.js', 'utf-8');

let file = data.toString();

if (file.includes(proUrl)) {
  let newFile = file.replace(proUrl, devUrl);
  fs.writeFileSync('./src/api/api.js', newFile);
}
