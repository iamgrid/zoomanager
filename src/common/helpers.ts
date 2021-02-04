export function capitalize(input: string): string {
	return input
		.split(' ')
		.map((el) => `${el.substr(0, 1).toUpperCase()}${el.substr(1)}`)
		.join(' ');
}