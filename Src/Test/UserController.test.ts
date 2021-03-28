// https://www.npmjs.com/package/supertest
import 'reflect-metadata';
import supertest from 'supertest';
import express from 'express';

import { UserController } from '../Controllers';

const app: express.Application = express();
const request = supertest(app);

describe('Function getAll', () => {
	app.get('/', UserController.getAll);

	test('Should return User list', async () => {
		// arrange
		const expectedStatus: number = 200;

		// act
		const response = await request.get('/');

		// assert
		expect(response.status).toBe(expectedStatus);
	});
});

describe('Function getSingle', () => {
	app.get('/:email', UserController.getSingle);

	test('Should return User', async () => {
		// arrange
		const expectedStatus: number = 200;

		// act
		const response = await request.get('/marc@mail.com');

		// assert
		expect(response.status).toBe(expectedStatus);
	});
});
