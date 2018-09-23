// tslint:disable-next-line:no-var-requires
const index = require('../src');

describe('index.ts', () => {
  it('should export a reference to its directory', () => {
    expect(index).toEqual({ rulesDirectory: '.' });
  });
});
