import React from 'react';
import { render, screen } from '@testing-library/react';
import Counter from './Counter';
import { store } from '../../store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

test('renders counter container', () => {
	render(<Provider store={store}><Counter /></Provider>);
	const counterDiv = screen.getByLabelText(/counter container/i);
	expect(counterDiv).toBeInTheDocument();
});

test('clicking on the increment button increments the counter', () => {
	render(<Provider store={store}><Counter /></Provider>);
	const counterDisp = screen.getByLabelText(/current counter value/i);
	expect(counterDisp).toHaveTextContent('0');
	userEvent.click(screen.getByLabelText(/increment value/i));
	expect(counterDisp).toHaveTextContent('1');
});