const _ = require('lodash');
const assert = require("assert");


/**
 * @param {Object} reference
 * @param {Object} opts
 * @param {Promise} opts.request
 * @param {String[]} opts.omitFields
 * @returns {Mocha.Suite}
 */
function testEntity(reference, opts = {}) {
  const {name, flow, request, omitFields} = opts;

  return describe(`${name}-${flow}`, async function () {
    before(`Create and get ${name}`, async () => {
      this.response = await request;
      return Promise.resolve();
    })

    if (omitFields.length) {
      reference = _.omit(reference, omitFields);
      this.response = _.omit(this.response, omitFields);
    }

    this.tests = Object.entries(reference).map(([key, value]) => {
      return it(key, () => assert.deepStrictEqual(value, this.response[key]));
    })
  })
}

module.exports = testEntity;