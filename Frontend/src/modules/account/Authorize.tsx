import React from 'react';
import { Route } from 'react-router-dom';
import { LoginComponent } from './LoginComponent';
import { Register } from './Register';

export class Authorize extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Route path="/auth/login">
          <LoginComponent/>
        </Route>
        <Route path="/auth/register">
          <Register/>
        </Route>
      </div>
    );
  }
}