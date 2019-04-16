/* eslint-disable no-console */

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

let consoleError;
let originalFetch;

beforeAll(() => {
  consoleError = console.error;
  console.error = (err) => {
    throw err;
  };
  originalFetch = global.fetch;
  global.fetch = jest.fn();
});

afterAll(() => {
  console.error = consoleError;
  global.fetch = originalFetch;
});

global.__SERVER_SIDE__ = false;
