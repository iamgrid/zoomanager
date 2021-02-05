import React from 'react';
import './App.css';
import Header from './features/header/Header';
import Main from './features/main/Main';

const views: string[] = ['exposition', 'verse', 'coda'];

function App() {
	const [activeView, setActiveView] = React.useState(views[0]);
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
