import React from 'react';
import { render } from '@testing-library/react';
import { Chart } from '../../components';

describe('Chart', () => {
  test('should render', () => {
    render(<Chart data={[]} />);
    expect(true).toEqual(true);
  });
});
