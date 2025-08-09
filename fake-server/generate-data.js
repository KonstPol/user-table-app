import { faker } from '@faker-js/faker';

import fs from 'fs';
import path from 'path';

const generateData = () => {
  const users = [];

  for (let i = 0; i < 500; i++) {
    users.push({
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      city: faker.location.city(),
      registeredDate: faker.date.between({ from: '1990-01-01', to: '2025-01-01' }).toISOString(),
    });
  }

  return { users };
};
const dbFilePath = path.resolve('fake-server', 'db.json');

(() => {
  if (fs.existsSync(dbFilePath)) {
    console.log('db.json already exist!');

    return;
  }

  const data = generateData();

  fs.writeFileSync('fake-server/db.json', JSON.stringify(data, null, 2));

  console.log('db.json generated!');
})();
