// https://www.npmjs.com/package/supertest
import supertest from 'supertest';
import express from 'express';
import * as dotenv from 'dotenv';

import { UserController } from '../../Controllers';
import { HttpCodes } from '../../Enums';
import Database from '../../Database';

const app: express.Application = express();
const request = supertest(app);
app.use('/', UserController.router);

beforeAll(async () => {
	dotenv.config();
	await Database.initiate();
});

afterAll(async () => {
	await Database.conclude();
});

describe.skip('Function getAll', () => {
	test('Should return User list', async () => {
		// arrange
		const expectedStatus: HttpCodes = HttpCodes.Ok;

		// act
		const response = await request.get('/');

		// assert
		expect(response.status).toBe(expectedStatus);
	});
});

describe.skip('Function getSingle', () => {
	test('Should return User', async () => {
		// arrange
		const expectedStatus: HttpCodes = HttpCodes.Ok;

		// act
		const response = await request.get('/marc@mail.com');

		// assert
		expect(response.status).toBe(expectedStatus);
	});
});
