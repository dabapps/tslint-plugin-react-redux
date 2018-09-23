import * as Lint from 'tslint';
import * as ts from 'typescript';

const FAILURE_STRING = 'Props must alias individual prop types (State, Dispatch, Own, etc)';

// The walker takes care of all the work.
class RequirePropAliasWalker extends Lint.RuleWalker {
  public visitImportDeclaration (node: ts.ImportDeclaration) {
    // create a failure at the current position
    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_STRING));

    // call the base version of this visitor to actually parse this node
    super.visitImportDeclaration(node);
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new RequirePropAliasWalker(sourceFile, this.getOptions()));
  }
}
