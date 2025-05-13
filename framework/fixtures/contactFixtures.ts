import { faker } from '@faker-js/faker';

export function generateContactOnlyRequired() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };
}

export function generateContactFull() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    birthdate: faker.date.birthdate().toISOString().split('T')[0],
    email: `${faker.person.middleName().toLowerCase()}@test.ru`,
    phone: `${faker.phone.number({ style: 'international' })}`,
    street1: faker.location.street(),
    street2: faker.location.secondaryAddress(),
    city: faker.location.city(),
    stateProvince: faker.location.state({ abbreviated: true }),
    postalCode: faker.location.zipCode(),
    country: faker.location.countryCode(),
  };
}
