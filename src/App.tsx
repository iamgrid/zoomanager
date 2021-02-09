import React from 'react';
import './App.css';
import { ViewContext } from './ViewContext';
// import common from './fieldConfigs/common.json';
import Header from './features/header/Header';
import Main from './features/main/Main';
import { view } from './types';

const views: view[] = ['exposition', 'verse', 'coda'];

// const fieldConfigs = {
// 	common: common,
// };

// console.log(fieldConfigs);

function App() {
	const [activeView, setActiveView] = React.useState<view>(views[0]);
	return (
		<div className='App' aria-label='App container'>
			<ViewContext.Provider value={{ activeView, setActiveView }}>
				<Header views={views} />
				<Main />
			</ViewContext.Provider>
		</div>
	);
}

export default App;
