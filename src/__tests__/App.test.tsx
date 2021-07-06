import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('should render', () => {
    render(<App />);
    expect(true).toEqual(true);
  });
});
