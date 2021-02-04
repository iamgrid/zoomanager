import React from 'react';
import { capitalize } from '../../common/helpers';

interface HeaderProps {
	views: string[],
	activeView: string,
	setActiveView(newActiveView: string): void 
}

export default function Header({ views, activeView, setActiveView }: HeaderProps) {
	return (
		<header className="header">
			<h1 className="header__app_name">ZooManager</h1>
			<label className="header__view_selector_label" htmlFor="header__view_selector">Views</label>
			<div className="header__view_selector">
				{
					views.map((el, ix) => {
						let classes = ['header__view_selector_button'];
						if (el === activeView)
							classes.push('header__view_selector_button--active');

						return (
							<button key={ix} className={classes.join(" ")} onClick={() => setActiveView(el)} data-testid="view_changer_button">{capitalize(el)}</button>
						);
					})
				}
			</div>
		</header>
	)
}