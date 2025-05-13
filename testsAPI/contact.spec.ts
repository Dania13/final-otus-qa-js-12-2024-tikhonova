// import { addMsg } from 'jest-html-reporters/helper';
import {
  ContactFixture,
  ContactService,
  Credentials,
  User,
  UserFixture,
  UserService,
} from '../framework';

// jest.retryTimes(3);

describe('test add contact', () => {
  let user: Credentials;
  let userResponse: {
    user: User;
    token: string;
  };

  beforeEach(async () => {
    user = UserFixture.recieveUserCredentials();
    userResponse = (await UserService.login(user.email, user.password)).data;
  });
  it('success with only first and last names', async () => {
    const contact = ContactFixture.generateContactOnlyRequired();

    const response = await ContactService.add(contact, userResponse.token);

    expect(response.status).toBe(201);
    expect(response.data.owner).toBe(userResponse.user._id);
    expect(response.data.firstName).toBe(contact.firstName);
    expect(response.data.lastName).toBe(contact.lastName);
    // addMsg({
    //   message: `Токен: ${userResponse.token}`,
    // });
  });

  it('success with all fields', async () => {
    const contact = ContactFixture.generateContactFull();

    const response = await ContactService.add(contact, userResponse.token);

    expect(response.status).toBe(201);
    expect(response.data.owner).toBe(userResponse.user._id);
    expect(response.data.firstName).toBe(contact.firstName);
    expect(response.data.lastName).toBe(contact.lastName);
    expect(response.data.birthdate).toBe(contact.birthdate);
    expect(response.data.email).toBe(contact.email);
    expect(response.data.phone).toBe(contact.phone);
    expect(response.data.street1).toBe(contact.street1);
    expect(response.data.street2).toBe(contact.street2);
    expect(response.data.city).toBe(contact.city);
    expect(response.data.stateProvince).toBe(contact.stateProvince);
    expect(response.data.postalCode).toBe(contact.postalCode);
    expect(response.data.country).toBe(contact.country);

    // addMsg({
    //   message: `Токен: ${userResponse.token}`,
    // });
  });

  it('without required field firstName', async () => {
    const contact = ContactFixture.generateContactFull();
    contact.firstName = '';

    const response = await ContactService.add(contact, userResponse.token);

    expect(response.status).toBe(400);
    expect(response.data.message).toBe(
      'Contact validation failed: firstName: Path `firstName` is required.',
    );
  });

  it('without required field lastName', async () => {
    const contact = ContactFixture.generateContactFull();

    contact.lastName = '';

    const response = await ContactService.add(contact, userResponse.token);

    expect(response.status).toBe(400);
    expect(response.data.message).toBe(
      'Contact validation failed: lastName: Path `lastName` is required.',
    );
  });
});

describe('test get contact list', () => {
  it('success', async () => {
    const user = UserFixture.recieveUserCredentials();
    const userResponse = (await UserService.login(user.email, user.password))
      .data;
    const response = await ContactService.GetContactList(userResponse.token);

    expect(response.status).toBe(200);
    expect(response.data[0].owner).toBe(userResponse.user._id);
  });

  it('without token', async () => {
    const response = await ContactService.GetContactList();

    expect(response.status).toBe(401);
    expect(response.data.error).toBe('Please authenticate.');
  });
});
