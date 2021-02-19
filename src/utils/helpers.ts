import { view } from '../ViewContext';
import {
	rawFieldConfigs,
	fieldConfigs,
	completeExpositionFieldConfigItem,
	completeVerseFieldConfigItem,
	speciesType,
	speciesCollectionType,
} from '../types';

export function capitalize(
	input: string,
	mode: 'first_letter' | 'all_words' = 'all_words'
): string {
	function capitalizeString(word: string) {
		return `${word.substr(0, 1).toUpperCase()}${word.substr(1)}`;
	}
	if (mode === 'all_words') {
		return input
			.split(' ')
			.map((el) => capitalizeString(el))
			.join(' ');
	} else if (mode === 'first_letter') {
		return capitalizeString(input);
	} else {
		return input;
	}
}

export function hasOwnProperty<X extends {}, Y extends PropertyKey>(
	obj: X,
	prop: Y
): obj is X & Record<Y, unknown> {
	return obj.hasOwnProperty(prop);
}

export function isFieldConfigItem(
	obj: any
): obj is completeExpositionFieldConfigItem | completeVerseFieldConfigItem {
	return typeof obj.prefix === 'string' && typeof obj.suffix === 'string';
}

export function isExpositionFieldConfigItem(
	obj: any
): obj is completeExpositionFieldConfigItem {
	return typeof obj.icon === 'string' && typeof obj.required === 'boolean';
}

export function isSpeciesType(obj: any): obj is speciesType {
	return typeof obj.commonName === 'string' && typeof obj.diet === 'string';
}

export function getAgeFromBirthday(birthday: string): number {
	const now = new Date().getTime();
	const bd = new Date(birthday).getTime();

	if (bd > now) return 0;

	const ageInMS = now - bd;
	const ageDate = new Date(ageInMS);
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function flattenTaxonomy(taxonomyData: any) {
	const re: speciesCollectionType = {};

	function fTHelper(key: string, node: any) {
		if (isSpeciesType(node)) {
			re[key] = node;
		} else {
			for (const key2 in node) {
				fTHelper(key2, node[key2]);
			}
		}
	}

	for (const key in taxonomyData) {
		fTHelper(key, taxonomyData[key]);
	}

	console.log('flattenTaxonomy() was called');

	return re;
}

export function processFieldConfigs(rawConfigs: rawFieldConfigs): fieldConfigs {
	// organizes fields for easy iteration
	// based on their sectionLinePosition property,
	// combines common field settings with each named variant,
	// e.g. exposition = exposition + common

	const re: fieldConfigs = { exposition: {}, verse: {} };

	Object.values(view).forEach((currentView) => {
		const bounds = {
			section: { min: 1, max: 1 },
			line: { min: 10, max: 10 },
			entry: { min: 10, max: 10 },
		};

		const currentConfig = [...rawConfigs[currentView]];

		for (const item in currentConfig) {
			const rawPositionsArray = currentConfig[item].sectionLinePosition.split(
				'|'
			);
			const positionsArray = rawPositionsArray.map((el) => Number(el));
			const [itemSection, itemLine, itemEntry] = positionsArray;

			if (itemSection < bounds.section.min) bounds.section.min = itemSection;
			if (itemSection > bounds.section.max) bounds.section.max = itemSection;

			if (itemLine < bounds.line.min) bounds.line.min = itemLine;
			if (itemLine > bounds.line.max) bounds.line.max = itemLine;

			if (itemEntry < bounds.entry.min) bounds.entry.min = itemEntry;
			if (itemEntry > bounds.entry.max) bounds.entry.max = itemEntry;
		}

		// console.log(currentView, bounds);

		for (
			let section = bounds.section.min;
			section <= bounds.section.max;
			section++
		) {
			const currentSectionItems = currentConfig.filter((item) => {
				if (item.sectionLinePosition.split('|')[0] === String(section))
					return item;
				return false;
			});

			if (currentSectionItems.length > 0) {
				re[currentView][section] = {};

				for (let line = bounds.line.min; line <= bounds.line.max; line++) {
					const currentLineItems = Object.values(currentConfig).filter(
						(item) => {
							if (
								item.sectionLinePosition.split('|')[0] === String(section) &&
								item.sectionLinePosition.split('|')[1] === String(line)
							)
								return item;
							return false;
						}
					);

					if (currentLineItems.length > 0) {
						re[currentView][section][line] = {};

						currentLineItems.forEach((lineItem) => {
							const entryId = Number(
								lineItem.sectionLinePosition.split('|')[2]
							);
							re[currentView][section][line][entryId] = {
								...rawConfigs.common[lineItem.id],
								...lineItem,
							};
						});
					}
				}
			}
		}

		// console.log(re);
	});

	return re;
}
