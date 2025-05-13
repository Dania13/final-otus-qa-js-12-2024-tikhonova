import type { Page } from 'playwright-core';

export function AddContactPage({ page }: { page: Page }) {
  const logout = async () => {
    await page.getByRole('button', { name: 'Logout' }).click();
  };

  const cancel = async () => {
    await page.getByRole('button', { name: 'Cancel' }).click();
  };

  const submit = async () => {
    await page.getByRole('button', { name: 'Submit' }).click();
  };

  const fillFirstName = async (firstName: string) => {
    await page.getByPlaceholder('First Name').pressSequentially(firstName);
  };

  const fillLastName = async (lastName: string) => {
    await page.getByPlaceholder('Last Name').pressSequentially(lastName);
  };

  const fillbirthDate = async (birthDate: string) => {
    await page.getByPlaceholder('yyyy-MM-dd').pressSequentially(birthDate);
  };

  const fillEmail = async (email: string) => {
    await page.getByPlaceholder('example@email.com').pressSequentially(email);
  };

  const fillPhone = async (phone: string) => {
    await page.getByPlaceholder('8005551234').pressSequentially(phone);
  };

  const fillAddress1 = async (address1: string) => {
    await page.getByPlaceholder('Address 1').pressSequentially(address1);
  };

  const fillAddress2 = async (address2: string) => {
    await page.getByPlaceholder('Address 2').pressSequentially(address2);
  };

  const fillCity = async (city: string) => {
    await page.getByPlaceholder('City').pressSequentially(city);
  };

  const fillState = async (state: string) => {
    await page.getByPlaceholder('State or Province').pressSequentially(state);
  };

  const fillPostalCode = async (postalCode: string) => {
    await page.getByPlaceholder('Postal Code').pressSequentially(postalCode);
  };

  const fillCountry = async (country: string) => {
    await page.getByPlaceholder('Country').pressSequentially(country);
  };

  const fillOnlyRequiredFields = async (
    firstName: string,
    lastName: string,
  ) => {
    await fillFirstName(firstName);
    await fillLastName(lastName);
    await submit();
  };

  const fillAllFields = async (
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
    await fillFirstName(firstName);
    await fillLastName(lastName);
    await fillbirthDate(birthDate);
    await fillEmail(email);
    await fillPhone(phone);
    await fillAddress1(address1);
    await fillAddress2(address2);
    await fillCity(city);
    await fillState(state);
    await fillPostalCode(postalCode);
    await fillCountry(country);
    await submit();
  };

  return {
    logout,
    cancel,
    submit,
    fillFirstName,
    fillLastName,
    fillbirthDate,
    fillEmail,
    fillPhone,
    fillAddress1,
    fillAddress2,
    fillCity,
    fillState,
    fillPostalCode,
    fillCountry,
    fillOnlyRequiredFields,
    fillAllFields,
  };
}
