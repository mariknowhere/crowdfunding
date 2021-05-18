import { getAccessToken } from 'axios-jwt';
import { IUser } from './modules/account/Register';
import { get } from 'local-storage';

export const isLogged = ():boolean => !!getAccessToken();

export const getUser = (): IUser => get('user');