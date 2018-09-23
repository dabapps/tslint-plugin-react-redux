import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'Props must not be an union in Component or PureComponent params';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new NoPropUnionWalker(sourceFile, this.getOptions()));
  }
}

// The walker takes care of all the work.
class NoPropUnionWalker extends Lint.RuleWalker {
  public visitClassDeclaration (node: ts.ClassDeclaration) {
    if (node.heritageClauses && node.heritageClauses.length) {
      node.heritageClauses.forEach((heritage) => {
        heritage.forEachChild((child) => {
          if (child.kind === ts.SyntaxKind.ExpressionWithTypeArguments) {
            this.checkExpression(child as ts.ExpressionWithTypeArguments);
          }
        });
      });
    }

    // call the base version of this visitor to actually parse this node
    super.visitClassDeclaration(node);
  }

  private getExpressionName (node: ts.ExpressionWithTypeArguments) {
    if (ts.isIdentifier(node.expression)) {
      return (node.expression as ts.Identifier).escapedText;
    } else if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
      return (node.expression as ts.PropertyAccessExpression).name.escapedText;
    }

    return '';
  }

  private checkExpression (node: ts.ExpressionWithTypeArguments) {
    const name = this.getExpressionName(node);

    if (name === 'PureComponent' || name === 'Component') {
      const { typeArguments } = node;

      if (typeArguments) {
        typeArguments.forEach((typeArgument) => {
          if (typeArgument.kind === ts.SyntaxKind.UnionType) {
            // create a failure at the current position
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
          }
        });
      }
    }
  }
}
