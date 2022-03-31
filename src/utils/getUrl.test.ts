import getUrl from './getUrl';
import { API } from '../constants';

describe('getUrl', () => {
  const rootUrl = process.env.API_URL;

  test('url without pass query params', () => {
    expect(getUrl(API.Login)).toEqual(`${rootUrl}/${API.Login}`);
    expect(getUrl(API.Logout)).toEqual(`${rootUrl}/${API.Logout}`);
  });

  test('url with query params', () => {
    const queryParams = {
      paramsOne: 'hello',
      paramsTwo: 'world',
    };

    expect(getUrl(API.Login, queryParams)).toEqual(
      `${rootUrl}/${API.Login}?paramsOne=${queryParams.paramsOne}&paramsTwo=${queryParams.paramsTwo}`
    );
  });
});
