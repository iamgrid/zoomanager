import React from 'react';
import {
	completeExpositionFieldConfigItem,
	completeVerseFieldConfigItem,
	configItemId,
} from '../../types';
import { getAgeFromBirthday, isFieldConfigItem } from '../../utils/helpers';

function middleClasses(
	activeView: string,
	fontSize: string,
	cssClass: string
): string {
	const classes = ['data_display__entry_proper'];
	classes.push('text_' + activeView + '_' + fontSize);
	classes.push('text_' + activeView + '_' + cssClass);

	return classes.join(' ');
}

type configItem =
	| completeVerseFieldConfigItem
	| completeExpositionFieldConfigItem
	| null;

interface displayType {
	createFront(config: configItem): React.ReactElement | null;
	createMiddle(
		config: configItem,
		activeView: string,
		value: string
	): React.ReactElement | null;
	createBack(config: configItem): React.ReactElement | null;
	combine(
		config: configItem,
		activeView: string,
		value: string
	): Array<React.ReactElement | null>;
}

function createDisplay(type: string): displayType {
	const assembledDisplay = Object.create(genericDisplay);

	switch (type) {
		case 'species':
			Object.assign(assembledDisplay, speciesDisplay);
			break;
		case 'date_of_birth':
			Object.assign(assembledDisplay, dateOfBirthDisplay);
			break;
	}

	return assembledDisplay;
}

const genericDisplay: displayType = {
	createFront(config) {
		if (!isFieldConfigItem(config)) return null;
		return (
			<span className='data_display__prefix'>
				{config.prefix.replace(' ', '\u00A0')}
			</span>
		);
	},
	createMiddle(config, activeView, value) {
		if (typeof value !== 'string') return null;
		if (!isFieldConfigItem(config)) return null;
		return (
			<span
				className={middleClasses(activeView, config.fontSize, config.cssClass)}
			>
				{value}
			</span>
		);
	},
	createBack(config) {
		if (!isFieldConfigItem(config)) return null;
		return <span className='data_display__suffix'>{config.suffix}</span>;
	},
	combine(config, activeView, value) {
		return [
			this.createFront(config),
			this.createMiddle(config, activeView, value),
			this.createBack(config),
		];
	},
};

const speciesDisplay: any = {
	createMiddle(config: configItem, activeView: string, value: string) {
		if (!isFieldConfigItem(config)) return null;
		return (
			<span
				className={middleClasses(activeView, config.fontSize, config.cssClass)}
				data-tmp='species'
			>
				{value}
			</span>
		);
	},
};

const dateOfBirthDisplay: any = {
	createMiddle(config: configItem, activeView: string, value: string) {
		if (!isFieldConfigItem(config)) return null;
		let disp = value;
		if (config.displaySettings === 'show_age') {
			disp = String(getAgeFromBirthday(value));
		}
		return (
			<span
				className={middleClasses(activeView, config.fontSize, config.cssClass)}
				title={value}
			>
				{disp}
			</span>
		);
	},
};

type displaysType = {
	[key in configItemId]: displayType;
};

const displays: displaysType = {
	id: genericDisplay,
	name: genericDisplay,
	species: createDisplay('species'),
	date_of_birth: createDisplay('date_of_birth'),
	gender: genericDisplay,
	location: genericDisplay,
	enclosure: genericDisplay,
	dietary_restrictions: genericDisplay,
	public_notes: genericDisplay,
	admin_notes: genericDisplay,
};

export default displays;
