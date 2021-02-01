import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App container', () => {
  render(<App />);
  const appDiv = screen.getByLabelText(/app container/i);
	expect(appDiv).toBeInTheDocument();
	expect(appDiv).toHaveClass("App"); 
});
