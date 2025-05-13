import { expect } from '@playwright/test';
import type { Page } from 'playwright-core';

export function ContactListPage({ page }: { page: Page }) {
  const logout = async () => {
    await page.getByRole('button', { name: 'Logout' }).click();
  };

  const addNewContact = async () => {
    await page.getByRole('button', { name: 'Add a New Contact' }).click();
  };

  const chooseContact = async (fullName: string) => {
    await page.getByRole('row', { name: `${fullName}` }).click();
  };

  const haveContact = async (fullName: string, state = true) => {
    if (state) {
      await expect(
        page.getByRole('row', { name: `${fullName}` }),
      ).toBeAttached();
    } else {
      await expect(
        page.getByRole('row', { name: `${fullName}` }),
      ).not.toBeAttached();
    }
  };

  return {
    logout,
    addNewContact,
    chooseContact,
    haveContact,
  };
}
