import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

test('renders App container', async () => {
	act(() => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);
	});
	await screen.findByTestId('data_display');
	// need the above lines so that MSW (mock service worker) and jest-localstorage-mock
	// have enough time to get their ducks in a row

	const appDiv = screen.getByLabelText(/app container/i);
	expect(appDiv).toBeInTheDocument();
	expect(appDiv).toHaveClass('App');
	// screen.debug();
});
