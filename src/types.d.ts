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
