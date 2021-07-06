import React from 'react';
import { render } from '@testing-library/react';
import { Form } from '../../containers';

describe('Form', () => {
  test('should render', () => {
    render(<Form dispatch={jest.fn} companies={[]} config={{}} />);
    expect(true).toEqual(true);
  });
});
