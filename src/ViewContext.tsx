import React from 'react';

export enum view {
	exposition = 'exposition',
	verse = 'verse',
	coda = 'coda',
}

interface providerValue {
	activeView: view;
	setActiveView: (view: view) => void;
}

export const ViewContext = React.createContext<providerValue>({
	activeView: view.exposition,
	setActiveView: (view) => console.warn('No theme provider'),
});

export const useView = () => React.useContext(ViewContext);
