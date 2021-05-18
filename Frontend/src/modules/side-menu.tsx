import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import LogOutIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';

export class SideMenuComponent extends React.Component<any, any> {
  state = {
    open: false,
  };

  toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    this.setState({ open });
  };

  render() {
    return (
      <div>
        <React.Fragment>
          <IconButton onClick={this.toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          
          <Drawer anchor="left" open={this.state.open} onClose={this.toggleDrawer(false)}>
            <div role="presentation"
                 onClick={this.toggleDrawer(false)}
                 onKeyDown={this.toggleDrawer(false)}>
              <Link to="/">
                <ListItem button>
                  <ListItemIcon>
                    <HomeIcon/>
                  </ListItemIcon>
                  <ListItemText>Главная страница</ListItemText>
                </ListItem>
              </Link>

              <Link to="/personal-area">
                <ListItem button>
                  <ListItemIcon>
                    <PersonIcon/>
                  </ListItemIcon>
                  <ListItemText>Личный профиль</ListItemText>
                </ListItem>
                <Divider/>
              </Link>
              
              <Link to="/auth/login">
                <ListItem button>
                  <ListItemIcon>
                    <LogOutIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Логин"/>
                </ListItem>
              </Link>
            </div>
          </Drawer>
        </React.Fragment>
      </div>
    );
  }
}
