import config from '../config/config';

export function recieveUserCredentials() {
  return {
    email: config.credentials.email,
    password: config.credentials.password,
  };
}
