import { IItem, Roles } from '~/services/getUserItems';
import itemHasReusedPassword from './itemHasReusedPassword';

describe('itemHasReusedPassword', () => {
  const arrObjects: IItem[] = [
    {
      id: '1',
      name: 'Name',
      role: Roles.read,
      createdAt: '',
      email: '123@mail.com',
    },
    {
      id: '2',
      name: 'Name',
      role: Roles.read,
      createdAt: '',
      email: '223@mail.com',
    },
    {
      id: '3',
      name: 'Name',
      role: Roles.read,
      createdAt: '',
      email: '223@mail.com',
    },
    {
      id: '4',
      name: 'Name',
      role: Roles.read,
      createdAt: '',
      email: '323@mail.com',
    },
    {
      id: '5',
      name: 'Name',
      role: Roles.read,
      createdAt: '',
      email: '323@mail.com',
    },
    {
      id: '6',
      name: 'Name',
      role: Roles.read,
      createdAt: '',
      email: '623@mail.com',
    },
    {
      id: '7',
      name: 'Name',
      role: Roles.read,
      createdAt: '',
      email: '623@mail.com',
    },
    {
      id: '8',
      name: 'Name',
      role: Roles.read,
      createdAt: '',
      email: '723@mail.com',
    },
    {
      id: '9',
      name: 'Name',
      role: Roles.read,
      createdAt: '',
      email: '823@mail.com',
    },
  ];

  test('search for objects with the same email', () => {
    expect(itemHasReusedPassword(arrObjects[2], arrObjects)).toBeTruthy();
    expect(itemHasReusedPassword(arrObjects[5], arrObjects)).toBeTruthy();
  });

  test('search for objects with different email', () => {
    const testObjects: IItem[] = [
      {
        id: '1',
        name: 'Name',
        role: Roles.read,
        createdAt: '',
        email: '999@mail.de',
      },
      {
        id: '2',
        name: 'Name',
        role: Roles.read,
        createdAt: '',
        email: ' 223@mail.com ',
      },
      {
        id: '3',
        name: 'Name',
        role: Roles.read,
        createdAt: '',
        email: '23@mail.com',
      },
      {
        id: '4',
        name: 'Name',
        role: Roles.read,
        createdAt: '',
        email: '423@mailcom',
      },
    ];

    expect(itemHasReusedPassword(testObjects[0], arrObjects)).toBeFalsy();
    expect(itemHasReusedPassword(testObjects[1], arrObjects)).toBeFalsy();
    expect(itemHasReusedPassword(testObjects[2], arrObjects)).toBeFalsy();
    expect(itemHasReusedPassword(testObjects[3], arrObjects)).toBeFalsy();
  });
});
