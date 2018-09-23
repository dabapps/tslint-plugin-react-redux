import { Rule as NoPropIntersection } from '../src/noPropIntersectionRule';
import { addFailureSpy, runRuleForTestFile } from './helpers/run-rule-for-test-file';

describe('no-prop-intersection', () => {
  beforeEach(() => {
    addFailureSpy.mockClear();
  });

  it('should do some things', () => {
    runRuleForTestFile(NoPropIntersection, 'failure.tsx');

    expect(addFailureSpy).toHaveBeenCalledTimes(1);
  });
});
