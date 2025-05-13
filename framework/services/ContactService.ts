import supertest from 'supertest';
import config from '../config/config';
import { Contact } from '../models';

const AddContact = async (contact: Contact, token?: string) => {
  const response = await supertest(config.baseURL)
    .post('/contacts')
    .set('Authorization', 'Bearer ' + token)
    .send(contact);

  return {
    headers: response.headers,
    status: response.status,
    data: await response.body,
  };
};

const GetContactList = async (token?: string) => {
  const response = await supertest(config.baseURL)
    .get('/contacts')
    .set('Authorization', 'Bearer ' + token);
  // .send(contact);

  return {
    headers: response.headers,
    status: response.status,
    data: await response.body,
  };
};

export default {
  add: AddContact,
  GetContactList: GetContactList,
};
