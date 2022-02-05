const fs = require("fs");
const testEntity = require("./index");

const reference = JSON.parse(fs.readFileSync('./test/references/products-out-reference.json'));
testEntity(reference, {
  name: 'products',
  flow: 'out',
  request: Promise.resolve(reference),
  omitFields: []
})