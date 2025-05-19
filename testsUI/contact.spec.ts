import { expect, test } from '@playwright/test';
import {
  AddContactPage,
  ContactDetails,
  ContactFixture,
  ContactListPage,
  loginUser,
  UserFixture,
} from '../framework';

test.beforeEach(async ({ page }) => {
  const user = UserFixture.recieveUserCredentials();
  await loginUser(page, user.email, user.password);
});

test('Choose exist contact', async ({ page }) => {
  const contactListPage = ContactListPage({ page });
  await contactListPage.chooseContact('Juwan Cruickshank');

  await expect(page).toHaveURL(/contactDetails/);
});

test('Success logout', async ({ page }) => {
  const contactListPage = ContactListPage({ page });
  await contactListPage.logout();

  await expect(page).not.toHaveURL(/contactList/);
});

test('Add new contact with only required fields', async ({ page }) => {
  const contactListPage = ContactListPage({ page });
  await contactListPage.addNewContact();

  const addContactPage = AddContactPage({ page });
  const contact = ContactFixture.generateContactOnlyRequired();
  await addContactPage.fillOnlyRequiredFields(
    contact.firstName,
    contact.lastName,
  );

  await expect(page).toHaveURL(/contactList/);
  await contactListPage.haveContact(`${contact.firstName} ${contact.lastName}`);
});

test('Add new contact with all fields', async ({ page }) => {
  const contactListPage = ContactListPage({ page });
  await contactListPage.addNewContact();

  const addContactPage = AddContactPage({ page });
  const contact = ContactFixture.generateContactFull();
  await addContactPage.fillAllFields(
    contact.firstName,
    contact.lastName,
    contact.birthdate,
    contact.email,
    contact.phone,
    contact.street1,
    contact.street2,
    contact.city,
    contact.stateProvince,
    contact.postalCode,
    contact.country,
  );

  await expect(page).toHaveURL(/contactList/);
  await contactListPage.haveContact(`${contact.firstName} ${contact.lastName}`);
});

test('Check that contact have all fields', async ({ page }) => {
  const contactListPage = ContactListPage({ page });
  await contactListPage.addNewContact();

  const addContactPage = AddContactPage({ page });
  const contact = ContactFixture.generateContactFull();
  await addContactPage.fillAllFields(
    contact.firstName,
    contact.lastName,
    contact.birthdate,
    contact.email,
    contact.phone,
    contact.street1,
    contact.street2,
    contact.city,
    contact.stateProvince,
    contact.postalCode,
    contact.country,
  );

  await contactListPage.chooseContact(
    `${contact.firstName} ${contact.lastName}`,
  );
  const contactDetails = ContactDetails({ page });
  await contactDetails.checkAllFields(
    contact.firstName,
    contact.lastName,
    contact.birthdate,
    contact.email,
    contact.phone,
    contact.street1,
    contact.street2,
    contact.city,
    contact.stateProvince,
    contact.postalCode,
    contact.country,
  );
});

test('Delete contact success', async ({ page }) => {
  const contactListPage = ContactListPage({ page });
  await contactListPage.addNewContact();

  const addContactPage = AddContactPage({ page });
  const contact = ContactFixture.generateContactOnlyRequired();
  await addContactPage.fillOnlyRequiredFields(
    contact.firstName,
    contact.lastName,
  );

  await contactListPage.chooseContact(
    `${contact.firstName} ${contact.lastName}`,
  );
  const contactDetails = ContactDetails({ page });

  await contactDetails.deleteContact();
  await expect(page).toHaveURL(/contactList/);
  await contactListPage.haveContact(
    `${contact.firstName} ${contact.lastName}`,
    false,
  );
});
