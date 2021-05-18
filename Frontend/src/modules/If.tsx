import React from 'react';

export class If extends React.Component<{ if: boolean }, any> {
  render() {
    return (
      this.props.if && this.props.children
    );
  }
}