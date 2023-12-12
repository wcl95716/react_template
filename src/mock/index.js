const fs = require('fs');

let fileName = './label.json';

async function parseData() {
  const data = require(fileName);
  let arr = [];
  data.map((item) => {
    delete item.user_interact;
    arr.push(item);
  });

  await fs.writeFileSync(fileName, JSON.stringify(arr));
}

parseData();
