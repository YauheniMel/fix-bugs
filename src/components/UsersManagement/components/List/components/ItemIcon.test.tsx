import { screen, render } from '@testing-library/react';
import ItemIcon from './ItemIcon';

describe('ItemIcon', () => {
  test('correct display content icon', () => {
    render(<ItemIcon name={'Name'} />);

    const content = screen.getByText(/Na/);

    expect(content).toBeTruthy();
  });
});
