// https://www.npmjs.com/package/supertest
import supertest from 'supertest';
import express from 'express';
import { createConnection, getConnection } from 'typeorm';

import { UserController } from '../../Controllers';
import { HttpCodes } from '../../Enums';

const app: express.Application = express();
const request = supertest(app);
app.use('/', UserController.router);

beforeAll(async () => {
	await createConnection();
});

afterAll(async () => {
	await getConnection().close();
});

describe('Function getAll', () => {
	test('Should return User list', async () => {
		// arrange
		const expectedStatus: HttpCodes = HttpCodes.Ok;

		// act
		const response = await request.get('/');

		// assert
		expect(response.status).toBe(expectedStatus);
	});
});

describe('Function getSingle', () => {
	test('Should return User', async () => {
		// arrange
		const expectedStatus: HttpCodes = HttpCodes.Ok;

		// act
		const response = await request.get('/marc@mail.com');

		// assert
		expect(response.status).toBe(expectedStatus);
	});
});
