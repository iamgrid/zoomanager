import React from 'react';
import { capitalize } from '../../utils/helpers';
import { view } from '../../types';
import { ViewContext } from '../../ViewContext';

interface HeaderProps {
	views: view[];
}

export default function Header({ views }: HeaderProps): React.ReactElement {
	const { activeView, setActiveView } = React.useContext(ViewContext);
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
				{views.map((el, ix) => {
					let classes = ['header__view_selector_button'];
					if (el === activeView)
						classes.push('header__view_selector_button--active');

					return (
						<button
							key={ix}
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
