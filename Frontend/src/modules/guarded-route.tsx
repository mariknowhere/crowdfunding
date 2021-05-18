import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export interface IGuardedRouteProps {
  readonly path: string;
  readonly auth: (props: any) => boolean;
  readonly content: (props: any) => React.ReactNode;
}

export class GuardedRoute extends Component<IGuardedRouteProps, any> {
  render() {
    return (
      <Route path={this.props.path} render={props => this.props.auth(props) ?
        this.props.content(props)
        : <Redirect to="/auth/login"/>
      }/>
    );
  }
}
