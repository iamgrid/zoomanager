import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';
import { store } from '../../store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
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

test('renders header', () => {
	expect(screen.getByText(/zoomanager/i)).toBeInTheDocument();
	expect(screen.getByText(/views/i)).toBeInTheDocument();
});

test('clicking on a view button will change it to be the active view', () => {
	const secondViewButton = screen.getAllByTestId('view_changer_button')[1];
	expect(secondViewButton).not.toHaveClass(
		'header__view_selector_button--active'
	);
	userEvent.click(secondViewButton);
	expect(secondViewButton).toHaveClass('header__view_selector_button--active');
});
