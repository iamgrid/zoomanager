import React from 'react';
import './App.css';
import { view, ViewContext } from './ViewContext';
// import common from './fieldConfigs/common.json';
import Header from './features/header/Header';
import Main from './features/main/Main';

// const fieldConfigs = {
// 	common: common,
// };

// console.log(fieldConfigs);

function App() {
	const [activeView, setActiveView] = React.useState(view.exposition);

	return (
		<div className='App' aria-label='App container'>
			<ViewContext.Provider value={{ activeView, setActiveView }}>
				<Header />
				<Main />
			</ViewContext.Provider>
		</div>
	);
}

export default App;
