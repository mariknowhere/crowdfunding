import React from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { SideMenuComponent } from '../side-menu';
import { If } from '../If';
import { isLogged } from '../../login.utils';
import { Link } from 'react-router-dom';

export class ToolbarComponent extends React.Component<any, any> {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <SideMenuComponent/>
            <Typography variant="h6">
              Crowdfunding
            </Typography>
            <div className="spacer"/>
            
            <If if={!isLogged()}>
              <Link to="/auth/login">
                <Button color="inherit">Login</Button>
              </Link>
            </If>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}