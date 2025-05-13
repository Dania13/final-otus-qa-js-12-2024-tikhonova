import { config, UserFixture, UserService } from '../framework';

jest.retryTimes(3);

describe('test autorization', () => {
  it('success', async () => {
    const user = UserFixture.recieveUserCredentials();

    const response = await UserService.login(user.email, user.password);

    expect(response.status).toBe(200);
    expect(response.data.token).toBeDefined();
  });

  it('without password', async () => {
    const email = config.credentials.email;

    const response = await UserService.login(email);

    expect(response.status).toBe(401);
    expect(response.data.token).not.toBeDefined();
  });
});

describe('test get profile', () => {
  it('success', async () => {
    const user = UserFixture.recieveUserCredentials();

    const token = (await UserService.login(user.email, user.password)).data
      .token;
    const response = await UserService.getUser(token);

    expect(response.status).toBe(200);
    expect(response.data.email).toBe(user.email);
  });

  it('without token', async () => {
    const response = await UserService.getUser();

    expect(response.status).toBe(401);
    expect(response.data.error).toBe('Please authenticate.');
  });
});
