import * as path from 'path';
import * as Lint from 'tslint';
import * as ts from 'typescript';
import { Rule as NoPropIntersection } from '../src/noPropIntersectionRule';

describe('no-prop-intersection', () => {
  jest.spyOn(Lint.RuleWalker.prototype, 'addFailure');

  beforeEach(() => {
    (Lint.RuleWalker.prototype.addFailure as jest.Mock).mockClear();
  });

  it('should do some things', () => {
    const filePath = path.resolve(__dirname, '../test-files/failure.tsx');
    const sourceText = ts.sys.readFile(filePath, 'utf8');

    if (typeof sourceText === 'undefined') {
      throw new Error('Could not get test file contents');
    }

    const sourceFile = ts.createSourceFile(
      path.basename(filePath),
      sourceText,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.Unknown
    );

    const ruleOptions: Lint.IOptions = {
      ruleArguments: [],
      ruleSeverity: 'error',
      ruleName: '<ruleName>',
      disabledIntervals: []
    };

    const instance = new NoPropIntersection(ruleOptions);

    instance.apply(sourceFile);

    expect(Lint.RuleWalker.prototype.addFailure).toHaveBeenCalledTimes(1);
  });
});
