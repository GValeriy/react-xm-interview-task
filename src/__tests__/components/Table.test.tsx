import React from 'react';
import { render } from '@testing-library/react';
import { Table } from '../../components';

describe('Table', () => {
  test('should render', () => {
    render(<Table items={[]} fields={[]} />);
    expect(true).toEqual(true);
  });
});
