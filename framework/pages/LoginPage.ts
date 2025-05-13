import { expect } from '@playwright/test';
import type { Page } from 'playwright-core';

export function LoginPage({ page }: { page: Page }) {
  const visit = async () => {
    await page.goto('/');
  };

  const fillEmail = async (email?: string) => {
    await page.getByPlaceholder('Email').pressSequentially(`${email}`);
  };

  const fillPassword = async (password?: string) => {
    await page.getByPlaceholder('Password').pressSequentially(`${password}`);
  };

  const pressSubmit = async () => {
    await page.getByRole('button', { name: /Submit/ }).click();
  };

  const login = async (email?: string, password?: string) => {
    await visit();
    await fillEmail(email);
    await fillPassword(password);
    await pressSubmit();
  };

  const getError = async (textError: string) => {
    await expect(page.locator('#error')).toHaveText(textError);
  };

  return {
    visit,
    fillEmail,
    fillPassword,
    pressSubmit,
    login,
    getError,
  };
}
