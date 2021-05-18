import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Snackbar, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { appHistory } from '../../history.utils';
import { axiosInstance } from '../../axios.utils';

export interface IUser {
  email: string;
  username: string;
  password: string;
  name: string;
  id: number;
}

interface ICreateUserState {
  id: number;
  email: string;
  username: string;
  password: string;
  name: string;
  repeatPassword: string;
  users: IUser[];
  open: boolean;
  openError: boolean;
  errors: string[];
}

export class Register extends React.Component <object, ICreateUserState> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      name: '',
      username: '',
      password: '',
      repeatPassword: '',
      id: 123,
      users: [],
      open: false,
      errors: [],
      openError: false,
    };
  }

  validate() {
    let email = this.state.email;
    let password = this.state.password;
    let username = this.state.username;
    let repeatPassword = this.state.repeatPassword;
    let name = this.state.name;
    let errors = [];

    if (!username) {
      errors.push('Вы не указали username.');
    } else if (username.length <= 3) {
      errors.push('Ваше логин меньше 4 символов!');
    } else if (name.length <= 3) {
      errors.push('Ваше имя меньше 4 символов!');
    }

    if (!this.state.name) {
      errors.push('Вы не указали ваше имя.');
    }

    if (!password) {
      errors.push('Вы не указали пароль.');
    } else if (!repeatPassword) {
      errors.push('Вы не подтвердили пароль.');
    } else if (password.length <= 5) {
      errors.push('Ваш пароль меньше 6 символов.');
    } else if (!(password === repeatPassword)) {
      errors.push('Ваши пароли не совпадают.');
    }

    if (!email) {
      errors.push('Вы не указали email.');
    } else {
      let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!email.match(pattern)) {
        errors.push('Вы ввели некорректный email.');
      }
    }

    this.setState({ errors });
    return !errors.length;
  }

  createPlayer = () => {
    if (!this.validate()) {
      this.setState({ openError: true });
      return;
    }

    this.sendCreateUserRequest().then(() => {
      appHistory.push('/auth/login');
    });
  };

  sendCreateUserRequest() {
    return axiosInstance.post('/account', {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseError = () => {
    this.setState({ openError: false });
  };

  handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value });
  };

  handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  };

  handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  handleChangeRepeatPassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ repeatPassword: event.target.value });
  };

  render() {
    return (
      <form
        className="login">
        <div>
          <h1>Регистрация</h1>
        </div>

        <div
          className="login__fields-container">
          <div
            className="login__xz">
            <TextField
              onChange={this.handleChangeEmail}
              className="login__login"
              label="Email"/>
          </div>
          <div
            className="login__xz">
            <TextField
              onChange={event => this.setState({ name: event.target.value })}
              className="login__login"
              label="Name"/>
          </div>
          <div className="login__xz">
            <TextField
              onChange={this.handleChangeUsername}
              className="login__login"
              label="Login"/>
          </div>
          <div className="login__xz">
            <TextField
              type="password"
              onChange={this.handleChangePassword}
              className="login__login"
              label="Password"/>
          </div>
          <div
            className="login__xz">
            <TextField
              type="password"
              onChange={this.handleChangeRepeatPassword}
              className="login__login"
              label="Repeat password"/>
          </div>
        </div>
        <div className="button">
          <Button
            onClick={this.createPlayer}
            variant="contained">
            Регистрация
          </Button>
          <Snackbar
            open={this.state.open}
            onClose={this.handleClose}
            autoHideDuration={3000}>
            <Alert
              severity="success">
              Вы успешно зарегистрировались!
            </Alert>
          </Snackbar>

        </div>
        <div
          className="register">
          <Link to="/auth/login">Уже есть аккаунт?</Link>
        </div>
        <Snackbar
          open={!!this.state.errors.length}
          onClose={() => this.setState({ errors: [] })}
          autoHideDuration={8000}>
          <Alert
            severity="error">
            <div>
              {
                this.state.errors.map(error => <div key={error}>{error}</div>)
              }
            </div>
          </Alert>
        </Snackbar>
      </form>
    );
  }
}