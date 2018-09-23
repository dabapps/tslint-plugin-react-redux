import { Rule as NoPropIntersection } from '../src/noPropIntersectionRule';
import { addFailureSpy, runRuleForTestFile } from './helpers/run-rule-for-test-file';

describe('noPropIntersectionRule', () => {
  beforeEach(() => {
    addFailureSpy.mockClear();
  });

  it('should error once on test file "failure.tsx"', () => {
    runRuleForTestFile(NoPropIntersection, 'failure.tsx');

    expect(addFailureSpy).toHaveBeenCalledTimes(1);
  });
});
