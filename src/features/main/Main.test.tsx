import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';
import { store } from '../../store';
import { Provider } from 'react-redux';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

beforeEach(async () => {
	act(() => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);
	});
	await screen.findByTestId('data_table');
	// need the above lines so that MSW (mock service worker) and jest-localstorage-mock
	// have enough time to get their ducks in a row
});

test('renders mock data from src/mocks/server.js', () => {
	expect(screen.getByText(/suzy/i)).toBeInTheDocument();
	expect(screen.getAllByText(/panthera leo/i)).toHaveLength(2);
	expect(screen.getAllByText(/female/i)).toHaveLength(2);
	expect(screen.getByText(/babette/i)).toBeInTheDocument();
});
