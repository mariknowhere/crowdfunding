import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import { Button, Snackbar, TextField } from '@material-ui/core';
import { AxiosResponse } from 'axios';
import { Alert } from '@material-ui/lab';
import { appHistory } from '../../history.utils';
import { axiosInstance } from '../../axios.utils';
import { setAuthTokens } from 'axios-jwt';
import { IUser } from './Register';
import { set } from 'local-storage';

interface ICreateUserState {
  id: number;
  username: string;
  password: string;
  errors: string[];
}

interface IAuthResult {
  readonly token: string;
  readonly error: string;
  readonly user: IUser
}


export class LoginComponent extends React.Component<object, ICreateUserState> {
  constructor(props: any) {
    super(props);

    this.state = {
      id: 1,
      username: '',
      password: '',
      errors: [],
    };
  }

  validate(): boolean {
    let errors = [];
    let username = this.state.username;
    let password = this.state.password;

    if (!username && !password) {
      errors.push('Не указан логин и пароль.');
    } else if (!password) {
      errors.push('Не указан пароль.');
    } else if (!username) {
      errors.push('Не указан логин.');
    }

    this.setState({ errors });

    return !errors.length;
  }

  handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  handleLogin = () => {
    if (!this.validate()) {
      return;
    }

    axiosInstance.post<IAuthResult>(`/auth/login`, {
      username: this.state.username,
      password: this.state.password,
    }).then(this.handleLoginResult);


  };

  handleLoginResult = (result: AxiosResponse<IAuthResult>) => {
    if (result.data.error) {
      this.setState({ errors: [result.data.error] });
    } else {
      set('user', result.data.user);
      setAuthTokens({
        accessToken: result.data.token,
        refreshToken: '',
      });
      appHistory.push('/');
    }
  };

  removeErrors = (): void => this.setState({ errors: [] })

  render() {
    return (
      <form
        className="login">
        <div>
          <h1>Вход на сайт</h1>
        </div>
        <div
          className="login__fields-container">
          <TextField className="login__login"
                     onChange={this.handleLoginChange}
                     label="Username"/>
          <TextField className="login__login"
                     onChange={this.handlePasswordChange}
                     label="Password"/>
        </div>
        <div
          className="button">
          <Button
            variant="contained"
            onClick={this.handleLogin}>
            Войти
          </Button>
          <div
            className="register">
            <Link to="/auth/register">Нет аккаунта?</Link>
          </div>
        </div>
        <Snackbar
          open={!!this.state.errors.length}
          autoHideDuration={4000} onClose={this.removeErrors}>
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