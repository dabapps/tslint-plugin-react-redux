import message from '../src';

describe('index.ts', () => {
  it('should export hello world', () => {
    expect(message).toBe('Hello, World!');
  });
});
