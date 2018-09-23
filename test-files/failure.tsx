import * as React from 'react';
import { connect } from 'react-redux';

const { PureComponent } = React;

interface Props {
  foo: 'bar';
}

interface DispatchProps {
  baz: () => null;
}

export class MyComponent extends React.Component<Props & DispatchProps> {
  public render () {
    return (
      <p>
        Hello, World!
      </p>
    );
  }
}

export class MyOtherComponent extends PureComponent<{} | Props> {
  public render () {
    return <div />;
  }
}

export class YetAnotherComponent extends PureComponent<DispatchProps & {} | Props> {
  public render () {
    return <div />;
  }
}


export const mapStateToProps = () => {
  return {
    foo: 'not-bar'
  };
}

function mapDispatchToProps () {
  return {
    baz: () => 'this-is-wrong'
  };
}

export default connect<{}>(mapStateToProps, mapDispatchToProps)(MyComponent);
