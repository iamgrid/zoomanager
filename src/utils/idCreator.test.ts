// import { v4 as uuidv4 } from 'uuid';
import idCreator from './idCreator';

test('create an id with uuid', () => {
	const newId = idCreator.create();
	expect(typeof newId).toBe('string');
	expect(newId.length).toBeGreaterThanOrEqual(30);
	let uuidRegexp = new RegExp(/^[a-z\d-]+$/);
	expect(uuidRegexp.test(newId)).toBe(true);
});