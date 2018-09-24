import { Rule as NoComponentPropUnion } from '../src/noComponentPropUnionRule';
import { addFailureSpy, runRuleForTestFile } from './helpers/run-rule-for-test-file';

describe('noComponentPropUnionRule', () => {
  beforeEach(() => {
    addFailureSpy.mockClear();
  });

  it('should error twice on test file "failure.tsx"', () => {
    runRuleForTestFile(NoComponentPropUnion, 'failure.tsx');

    expect(addFailureSpy).toHaveBeenCalledTimes(2);
  });
});
