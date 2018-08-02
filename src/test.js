const fs = require('fs');

function pad(num, size) {
  var s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}

const fileName = 'test.txt';
for (let i = 1; i < 15397; i += 1) {
  let y = Math.floor(Math.random() * 200);
  let port_code = pad(i, 5);
  fs.appendFileSync(
    fileName,
    `perfmAcc${port_code}|perfmAcc${port_code}|perfmAcc${port_code}|UPLDcommCat${y}\n`
  );
}
