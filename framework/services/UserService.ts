import supertest from 'supertest';
import config from '../config/config';

const logIn = async (email: string, password?: string) => {
  const response = await supertest(config.baseURL).post('/users/login').send({
    email: email,
    password: password,
  });

  return {
    headers: response.headers,
    status: response.status,
    data: await response.body,
  };
};

const getUserProfile = async (token?: string) => {
  const response = await supertest(config.baseURL)
    .get('/users/me')
    .set('Authorization', 'Bearer ' + token)
    .send();

  return {
    headers: response.headers,
    status: response.status,
    data: await response.body,
  };
};

export default {
  login: logIn,
  getUser: getUserProfile,
};
