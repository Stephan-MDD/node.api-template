import 'reflect-metadata';
import { createConnection, getConnection } from 'typeorm';

import { UserService } from '../../Services';
import { User } from '../../Entities';
import { UserDTO } from '../../DTOs/User';

beforeAll(async () => {
	await createConnection();
});

afterAll(async () => {
	await getConnection().close();
});

describe('Function getAll', () => {
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
		const email: string = '';
		const expected: UserDTO = new User();

		// act
		const actual: UserDTO = await UserService.getSingle(email);

		// assert
		expect(expected).toBe(actual);
	});

	describe('Error Handling', () => {
		test('should throw Error', () => {
			// arrange
			const email: string = '';

			// act
			const action = async () => {
				await UserService.getSingle(email);
			};

			// assert
			expect(action).rejects.toThrow(Error);
		});
	});
});

describe('Function addSingle', () => {
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

describe('Function updateSingle', () => {
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

describe('Function deleteSingle', () => {
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
