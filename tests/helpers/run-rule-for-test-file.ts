import * as path from 'path';
import * as Lint from 'tslint';
import * as ts from 'typescript';

interface LintRule extends Lint.Rules.AbstractRule {
  new (ruleOptions: Lint.IOptions): Lint.Rules.AbstractRule;
}

export const addFailureSpy = jest.spyOn(Lint.RuleWalker.prototype, 'addFailure');

export function runRuleForTestFile (Rule: LintRule, fileName: string) {
  const filePath = path.resolve(__dirname, '../../test-files', fileName);
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

  const instance = new Rule(ruleOptions);

  instance.apply(sourceFile);
}
