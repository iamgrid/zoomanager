import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
	rest.get('/zoomanager/initialData.json', (req, res, ctx) => {
		// prettier-ignore
		return res(ctx.json([
			{
				"id": "f2ed8ebb-1934-434e-b700-849bbac48edc",
				"name": "Suzy",
				"species": "Panthera leo",
				"date_of_birth": "2001-01-03",
				"gender": "Female",
				"location": "With us",
				"enclosure": "Savanna",
				"dietary_restrictions": "",
				"public_notes": "Lorem ipsum denem sit amet",
				"admin_notes": ""
			},
			{
				"id": "6e671edd-d261-4019-ac77-e7e704f60150",
				"name": "Babette",
				"species": "Panthera leo",
				"date_of_birth": "2001-01-03",
				"gender": "Female",
				"location": "With us",
				"enclosure": "Savanna",
				"dietary_restrictions": "High chloresterol",
				"public_notes": "Accentuer elit",
				"admin_notes": ""
			}
		]));
	}),
];

const server = setupServer(...handlers);

export { server, rest };
