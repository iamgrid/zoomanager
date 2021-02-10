import React from 'react';
import { capitalize } from '../../utils/helpers';
import { view, useView } from '../../ViewContext';

export default function Header(): React.ReactElement {
	const { activeView, setActiveView } = useView();

	function handleViewSelection(newView: view): void {
		if (newView !== activeView) setActiveView(newView);
	}

	return (
		<header className='header'>
			<h1 className='header__app_name'>ZooManager</h1>
			<label
				className='header__view_selector_label'
				htmlFor='header__view_selector'
			>
				Views
			</label>
			<div className='header__view_selector'>
				{Object.values(view).map((el) => {
					let classes = ['header__view_selector_button'];
					if (el === activeView)
						classes.push('header__view_selector_button--active');

					return (
						<button
							key={el}
							className={classes.join(' ')}
							onClick={() => handleViewSelection(el)}
							data-testid='view_changer_button'
						>
							{capitalize(el)}
						</button>
					);
				})}
			</div>
		</header>
	);
}
