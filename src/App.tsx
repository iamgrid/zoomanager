import React from 'react';
import './App.css';
import { view, ViewContext } from './ViewContext';
import Header from './features/header/Header';
import Main from './features/main/Main';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faGift,
	faMapMarkerAlt,
	faUserLock,
	faGlobeAmericas,
	faPencilAlt,
	faTrashAlt,
	faCheck,
	faTimes,
	faPlus,
	faSearch,
} from '@fortawesome/free-solid-svg-icons';

library.add(
	faGift,
	faMapMarkerAlt,
	faUserLock,
	faGlobeAmericas,
	faPencilAlt,
	faTrashAlt,
	faCheck,
	faTimes,
	faPlus,
	faSearch
);

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
