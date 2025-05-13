import { Page } from 'playwright-core';
import { LoginPage } from '../pages';

export function login(page: Page, email?: string, password?: string) {
  const loginPage = LoginPage({ page });

  return () => {
    return loginPage.login(email, password);
  };
}

export function loginUser(page: Page, email?: string, password?: string) {
  return login(page, email, password)();
}
