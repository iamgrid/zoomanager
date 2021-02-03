import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	decrement,
	increment,
	incrementByAmount,
	incrementAsync,
	selectCount,
} from './counterSlice';

export default function Counter() {
	const count = useSelector(selectCount);
	const dispatch = useDispatch();
	const [incrementAmount, setIncrementAmount] = useState('2');

	return (
		<div aria-label="Counter container">
			<div>
				<button
					aria-label="Increment value"
					onClick={() => dispatch(increment())}
				>
					+
				</button>
				<span aria-label="Current counter value">{count}</span>
				<button
					aria-label="Decrement value"
					onClick={() => dispatch(decrement())}
				>
					-
				</button>
			</div>
			<div>
				<input
					aria-label="Set increment amount"
					value={incrementAmount}
					onChange={e => setIncrementAmount(e.target.value)}
				/>
				<button
					onClick={() =>
						dispatch(incrementByAmount(Number(incrementAmount) || 0))
					}
				>
					Add Amount
				</button>
				<button
					onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
				>
					Add Async
				</button>
			</div>
		</div>
	);
}