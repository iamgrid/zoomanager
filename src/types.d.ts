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

export interface commonFieldConfigItem {
	name: string;
	showAsTitleInstead: boolean;
	inputType: string;
	regexType: string;
	minLength: number;
	maxLength: number;
	options: string;
	initialValue: string;
	description: string;
}

export interface expositionFieldConfigItem {
	required: boolean;
	editable: boolean;
	sectionLinePosition: string;
	icon: string;
	fontSize: string;
	cssClass: string;
	prefix: string;
	suffix: string;
}

export interface verseFieldConfigItem {
	visible: boolean;
	sectionLine: string;
	fontSize: string;
	cssClass: string;
	prefix: string;
	suffix: string;
}

export interface fieldConfigs {
	common: {
		[prop: string]: commonFieldConfigItem;
	};
	exposition: {
		[prop: string]: expositionFieldConfigItem;
	};
	verse: {
		[prop: string]: verseFieldConfigItem;
	};
}
