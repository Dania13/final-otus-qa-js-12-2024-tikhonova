import { expect } from '@playwright/test';
import type { Page } from 'playwright-core';

export function ContactDetails({ page }: { page: Page }) {
  const editContact = async () => {
    await page.getByRole('button', { name: 'Edit Contact' }).click();
  };

  const deleteContact = async () => {
    page.on('dialog', async (dialog) => {
      console.log(dialog.message());
      await dialog.accept();
    });
    await page.getByRole('button', { name: 'Delete Contact' }).click();
  };

  const backToList = async () => {
    await page.getByRole('button', { name: 'Return to Contact List' }).click();
  };

  const checkFirstName = async (firstName: string) => {
    await expect(page.locator('#firstName')).toContainText(firstName);
  };

  const checkLastName = async (lastName: string) => {
    await expect(page.locator('#lastName')).toContainText(lastName);
  };

  const checkbirthDate = async (birthDate: string) => {
    await expect(page.locator('#birthdate')).toContainText(birthDate);
  };

  const checkEmail = async (email: string) => {
    await expect(page.locator('#email')).toContainText(email);
  };

  const checkPhone = async (phone: string) => {
    await expect(page.locator('#phone')).toContainText(phone);
  };

  const checkAddress1 = async (address1: string) => {
    await expect(page.locator('#street1')).toContainText(address1);
  };

  const checkAddress2 = async (address2: string) => {
    await expect(page.locator('#street2')).toContainText(address2);
  };

  const checkCity = async (city: string) => {
    await expect(page.locator('#city')).toContainText(city);
  };

  const checkState = async (state: string) => {
    await expect(page.locator('#stateProvince')).toContainText(state);
  };

  const checkPostalCode = async (postalCode: string) => {
    await expect(page.locator('#postalCode')).toContainText(postalCode);
  };

  const checkCountry = async (country: string) => {
    await expect(page.locator('#country')).toContainText(country);
  };

  const checkOnlyRequiredFields = async (
    firstName: string,
    lastName: string,
  ) => {
    await checkFirstName(firstName);
    await checkLastName(lastName);
  };

  const checkAllFields = async (
    firstName: string,
    lastName: string,
    birthDate: string,
    email: string,
    phone: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    postalCode: string,
    country: string,
  ) => {
    await checkFirstName(firstName);
    await checkLastName(lastName);
    await checkbirthDate(birthDate);
    await checkEmail(email);
    await checkPhone(phone);
    await checkAddress1(address1);
    await checkAddress2(address2);
    await checkCity(city);
    await checkState(state);
    await checkPostalCode(postalCode);
    await checkCountry(country);
  };

  return {
    editContact,
    deleteContact,
    backToList,
    checkFirstName,
    checkLastName,
    checkbirthDate,
    checkEmail,
    checkPhone,
    checkAddress1,
    checkAddress2,
    checkCity,
    checkState,
    checkPostalCode,
    checkCountry,
    checkOnlyRequiredFields,
    checkAllFields,
  };
}
