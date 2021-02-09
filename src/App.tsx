import React from 'react';
import './App.css';
import Header from './features/header/Header';
import Main from './features/main/Main';
import { view } from './types';

const views: view[] = ['exposition', 'verse', 'coda'];

function App() {
	const [activeView, setActiveView] = React.useState<view>(views[0]);
	return (
		<div className='App' aria-label='App container'>
			<Header
				views={views}
				activeView={activeView}
				setActiveView={setActiveView}
			/>
			<Main activeView={activeView} />
		</div>
	);
}

export default App;
