import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';
import { store } from '../../store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
	render(<Provider store={store}><App/></Provider>)
});

test('renders header', () => {
	screen.getByText(/zoomanager/i);
});

test('clicking on a view button will change it to be the active view', () => {
	const secondViewButton = screen.getAllByTestId('view_changer_button')[1];
	expect(secondViewButton).not.toHaveClass('header__view_selector_button--active');
	userEvent.click(secondViewButton);
	expect(secondViewButton).toHaveClass('header__view_selector_button--active');
});