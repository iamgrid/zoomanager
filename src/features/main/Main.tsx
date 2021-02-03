import React from 'react';

interface MainProps { 
	testProp: string,
	testProp2?: number
};

export default function Main({testProp, testProp2}: MainProps) {
	const [count, setCount] = React.useState<number>(0);

	function handleClick(event: React.MouseEvent): void {
		setCount(count + 1);
	}

	return (
		<div className='main' id='main'>
			<p>main {testProp} {testProp2 !== undefined ? testProp2 : null}</p>
			<p>{count}</p>
			<button onClick={handleClick}>click</button>
		</div>
	)
}