import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

it('renders correct headers', () => {
  render(<App />);
  expect(screen.getByText('Todos')).toBeInTheDocument();
});