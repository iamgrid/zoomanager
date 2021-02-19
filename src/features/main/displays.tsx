import React from 'react';
import {
	completeExpositionFieldConfigItem,
	completeVerseFieldConfigItem,
	configItemId,
	dataItem,
	speciesCollectionType,
} from '../../types';
import {
	getAgeFromBirthday,
	isFieldConfigItem,
	flattenTaxonomy,
	capitalize,
} from '../../utils/helpers';
import taxonomyData from '../../taxonomyData.json';

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
		value: string,
		itemData?: dataItem
	): React.ReactElement | null;
	createBack(config: configItem): React.ReactElement | null;
	combine(
		config: configItem,
		activeView: string,
		value: string,
		itemData: dataItem
	): Array<React.ReactElement | null>;
}

function createDisplay(type: string): displayType {
	// create an empty object with genericDisplay as the prototype:
	const assembledDisplay = Object.create(genericDisplay);

	// assign the custom methods needed:
	switch (type) {
		case 'species':
			Object.assign(assembledDisplay, speciesDisplay);
			break;
		case 'date_of_birth':
			Object.assign(assembledDisplay, dateOfBirthDisplay);
			break;
		case 'diet':
			Object.assign(assembledDisplay, dietDisplay);
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
		const classes = middleClasses(activeView, config.fontSize, config.cssClass);
		let re = <span className={classes}>{value}</span>;
		if (config.fontSize === 'xl') {
			re = <h2 className={classes}>{value}</h2>;
		}
		return re;
	},
	createBack(config) {
		if (!isFieldConfigItem(config)) return null;
		return <span className='data_display__suffix'>{config.suffix}</span>;
	},
	combine(config, activeView, value, itemData) {
		return [
			this.createFront(config),
			this.createMiddle(config, activeView, value, itemData),
			this.createBack(config),
		];
	},
};

const speciesDisplay: any = {
	createMiddle(config: configItem, activeView: string, value: string) {
		if (!isFieldConfigItem(config)) return null;
		let disp: string | React.ReactElement = value;
		if (config.displaySettings === 'show_common_name') {
			disp = (
				<>
					{getCommonNameFromSpecies(value)}
					<br />({value})
				</>
			);
		}
		return (
			<span
				className={middleClasses(activeView, config.fontSize, config.cssClass)}
				data-tmp='species'
			>
				{disp}
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

const dietDisplay: any = {
	createFront() {
		return null;
	},

	createMiddle(
		config: configItem,
		activeView: string,
		value: string,
		itemData: dataItem
	) {
		if (!isFieldConfigItem(config)) {
			console.error(config, 'is not of type fieldConfigItem');
			return null;
		}

		const speciesDiet = capitalize(
			getDietFromSpecies(itemData.species),
			'first_letter'
		);

		if (config.displaySettings === 'show_species_diet') {
			return (
				<>
					<span className='data_display__prefix'>
						{config.prefix.replace(' ', '\u00A0')}
					</span>
					<span
						className={middleClasses(
							activeView,
							config.fontSize,
							config.cssClass
						)}
					>
						{speciesDiet}
					</span>
				</>
			);
		} else if (config.displaySettings === 'show_both') {
			let restrictions = null;

			if (value.length > 0) {
				restrictions = (
					<>
						<br />
						<span className='data_display__prefix'>Restrictions: </span>
						<br />
						<span
							className={middleClasses(
								activeView,
								config.fontSize,
								config.cssClass
							)}
						>
							{value}
						</span>
					</>
				);
			}

			return (
				<>
					<span className={middleClasses(activeView, 'md', 'default')}>
						{speciesDiet}
					</span>
					{restrictions}
				</>
			);
		}
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
	diet: createDisplay('diet'),
	public_notes: genericDisplay,
	admin_notes: genericDisplay,
};

let flattenedTaxonomy: speciesCollectionType = {};

function getCommonNameFromSpecies(species: string) {
	if (Object.keys(flattenedTaxonomy).length < 1) {
		flattenedTaxonomy = flattenTaxonomy(taxonomyData);
	}

	return flattenedTaxonomy[species].commonName;
}

function getDietFromSpecies(species: string) {
	if (Object.keys(flattenedTaxonomy).length < 1) {
		flattenedTaxonomy = flattenTaxonomy(taxonomyData);
	}

	return flattenedTaxonomy[species].diet;
}

export default displays;
