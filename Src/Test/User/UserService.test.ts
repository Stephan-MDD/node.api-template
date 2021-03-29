import 'reflect-metadata';
import * as dotenv from 'dotenv';

import { UserService } from '../../Services';
import { User } from '../../Entities';
import { UserDTO } from '../../DTOs/User';
import { DBService } from '../../Services';
import { NotFoundError } from '../../Errors/ClientErrors';

beforeAll(async () => {
	dotenv.config();
	await DBService.initiate();
});

afterAll(async () => {
	await DBService.conclude();
});

describe.skip('Function getAll', () => {
	test('Should return User[]', async () => {
		// arrange
		const expected: UserDTO[] = [];

		// act
		const actual: UserDTO[] = await UserService.getAll();

		// assert
		expect(expected).toBe(actual);
	});
});

describe('Function getSingle', () => {
	test('Should return User', async () => {
		// arrange
		const email: string = 'marc@mail.com';

		const expected: UserDTO = {
			firstName: 'marc',
			lastName: 'noah',
			age: 26,
			email: 'marc@mail.com',
			password: 'secret',
			role: 2,
		};

		// act
		const actual: UserDTO = await UserService.getSingle(email);

		// assert
		expect(expected.firstName).toBe(actual.firstName);
	});

	describe('Error Handling', () => {
		test('should throw Error', () => {
			// arrange
			const email: string = 'invalid@mail.com';

			// act
			const action = async () => {
				await UserService.getSingle(email);
			};

			// assert
			expect(action).rejects.toThrow(NotFoundError);
		});
	});
});

describe.skip('Function addSingle', () => {
	test('Should add User', async () => {
		// arrange
		const user: User = new User();
		const expected: UserDTO = new User();

		// act
		const actual: UserDTO = await UserService.addSingle(user);

		// assert
		expect(expected).toBe(actual);
	});

	describe('Error Handling', () => {
		test('should throw Error', () => {
			// arrange
			const user: User = new User();

			// act
			const action = async () => {
				await UserService.addSingle(user);
			};

			// assert
			expect(action).rejects.toThrow(Error);
		});
	});
});

describe.skip('Function updateSingle', () => {
	test('Should update User', async () => {
		// arrange
		const email: string = '';
		const user: User = new User();

		const expected: UserDTO = new User();

		// act
		const actual: UserDTO = await UserService.updateSingle(email, user);

		// assert
		expect(expected).toBe(actual);
	});

	describe('Error Handling', () => {
		test('should throw Error', () => {
			// arrange
			const email: string = '';
			const user: User = new User();

			// act
			const action = async () => {
				await UserService.updateSingle(email, user);
			};

			// assert
			expect(action).rejects.toThrow(Error);
		});
	});
});

describe.skip('Function deleteSingle', () => {
	test('Should delete User', async () => {
		// arrange
		const email: string = '';

		const expected: UserDTO = new User();

		// act
		await UserService.deleteSingle(email);

		// assert
		// expect to throw NotFound on getSingle()
		// expect not to throw
	});

	describe('Error Handling', () => {
		test('should throw Error', () => {
			// arrange
			const email: string = '';

			// act
			const action = async () => {
				await UserService.deleteSingle(email);
			};

			// assert
			expect(action).rejects.toThrow(Error);
		});
	});
});
