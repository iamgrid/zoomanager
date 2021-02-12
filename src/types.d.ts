export interface dataItem {
	id: string;
	name: string;
	species: string;
	date_of_birth: string;
	gender: 'Male' | 'Female' | 'Other';
	location: 'With us' | 'On loan';
	enclosure:
		| 'In transit'
		| 'Aviary'
		| 'Elephant House'
		| 'Great Ape House'
		| 'Savanna'
		| 'Monkey World'
		| 'Madagascar House'
		| 'India House';
	dietary_restrictions: string;
	notes: string;
}

export interface rawCommonFieldConfigItem {
	name: string;
	inputType: string;
	regexType: string;
	minLength: number;
	maxLength: number;
	options: string;
	initialValue: string;
	description: string;
}

export interface rawExpositionFieldConfigItem {
	id: string;
	required: boolean;
	editable: boolean;
	sectionLinePosition: string;
	icon: string;
	fontSize: string;
	cssClass: string;
	prefix: string;
	suffix: string;
}

export interface expositionFieldConfig {
	[section: number]: {
		[line: number]: {
			[entry: number]: {
				id: string;
				name: string;
				inputType: string;
				regexType: string;
				minLength: number;
				maxLength: number;
				options: string;
				initialValue: string;
				description: string;
				required: boolean;
				editable: boolean;
				icon: string;
				fontSize: string;
				cssClass: string;
				prefix: string;
				suffix: string;
			};
		};
	};
}

export interface rawVerseFieldConfigItem {
	id: string;
	visible: boolean;
	sectionLinePosition: string;
	fontSize: string;
	cssClass: string;
	prefix: string;
	suffix: string;
}

export interface verseFieldConfig {
	[section: number]: {
		[line: number]: {
			[entry: number]: {
				id: string;
				name: string;
				inputType: string;
				regexType: string;
				minLength: number;
				maxLength: number;
				options: string;
				initialValue: string;
				description: string;
				visible: boolean;
				fontSize: string;
				cssClass: string;
				prefix: string;
				suffix: string;
			};
		};
	};
}

export interface rawFieldConfigs {
	common: {
		[prop: string]: rawCommonFieldConfigItem;
	};
	exposition: rawExpositionFieldConfigItem[];
	verse: rawVerseFieldConfigItem[];
}

export interface fieldConfigs {
	exposition: expositionFieldConfig;
	verse: verseFieldConfig;
}
