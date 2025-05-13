import { expect, test } from '@playwright/test';
import { LoginPage, UserFixture } from '../framework';

test('Success autorization', async ({ page }) => {
  const user = UserFixture.recieveUserCredentials();
  const loginPage = LoginPage({ page });
  await loginPage.visit();
  await loginPage.fillEmail(user.email);
  await loginPage.fillPassword(user.password);
  await loginPage.pressSubmit();

  await expect(page).toHaveURL(/contactList/);
});

test('Autorization without email', async ({ page }) => {
  const user = UserFixture.recieveUserCredentials();
  const loginPage = LoginPage({ page });
  await loginPage.visit();
  await loginPage.fillPassword(user.password);
  await loginPage.pressSubmit();

  await expect(page).not.toHaveURL(/contactList/);
  await loginPage.getError('Incorrect username or password');
});

test('Autorization without password', async ({ page }) => {
  const user = UserFixture.recieveUserCredentials();
  const loginPage = LoginPage({ page });
  await loginPage.visit();
  await loginPage.fillEmail(user.email);
  await loginPage.pressSubmit();

  await expect(page).not.toHaveURL(/contactList/);
  await loginPage.getError('Incorrect username or password');
});

test('Autorization with not exist user', async ({ page }) => {
  const user = {
    email: 'test@test.ru',
    password: 'trulala',
  };
  const loginPage = LoginPage({ page });
  await loginPage.visit();
  await loginPage.fillEmail(user.email);
  await loginPage.fillPassword(user.password);
  await loginPage.pressSubmit();

  await expect(page).not.toHaveURL(/contactList/);
  await loginPage.getError('Incorrect username or password');
});
