import * as helpers from './helpers';

test('capitalize works correctly', () => {
	expect(helpers.capitalize('testphrase 1')).toBe('Testphrase 1');
	expect(helpers.capitalize('lorem ipsum denem sit amet')).toBe('Lorem Ipsum Denem Sit Amet');
});