import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';

test('renders App container', () => {
	render(<Provider store={store}><App /></Provider>);
	const appDiv = screen.getByLabelText(/app container/i);
	expect(appDiv).toBeInTheDocument();
	expect(appDiv).toHaveClass("App"); 
});
