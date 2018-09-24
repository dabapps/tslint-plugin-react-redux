import { Rule as NoComponentPropIntersection } from '../src/noComponentPropIntersectionRule';
import { addFailureSpy, runRuleForTestFile } from './helpers/run-rule-for-test-file';

describe('noComponentPropIntersectionRule', () => {
  beforeEach(() => {
    addFailureSpy.mockClear();
  });

  it('should error once on test file "failure.tsx"', () => {
    runRuleForTestFile(NoComponentPropIntersection, 'failure.tsx');

    expect(addFailureSpy).toHaveBeenCalledTimes(1);
  });
});
