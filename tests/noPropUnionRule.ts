import { Rule as NoPropUnion } from '../src/noPropUnionRule';
import { addFailureSpy, runRuleForTestFile } from './helpers/run-rule-for-test-file';

describe('noPropUnionRule', () => {
  beforeEach(() => {
    addFailureSpy.mockClear();
  });

  it('should error twice on test file "failure.tsx"', () => {
    runRuleForTestFile(NoPropUnion, 'failure.tsx');

    expect(addFailureSpy).toHaveBeenCalledTimes(2);
  });
});
