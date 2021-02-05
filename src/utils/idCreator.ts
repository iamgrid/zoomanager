import { v4 as uuidv4 } from 'uuid';

const idCreator = {
	create(): string {
		return uuidv4();
	},
};

export default idCreator;
