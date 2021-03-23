import { UserService } from '../Services';
import { HttpCodes } from '../Enums';
import { User } from '../Models';

describe('Function getAll', () => {
	test('Should return User[]', async () => {
		// arrange
		const expectedData: User[] = null;
		const expectedStatus: HttpCodes = HttpCodes.Ok;
		const expectedMessage: string = '';

		// act
		const actual = await UserService.getAll();

		// assert
		expect(expectedData).toBe(actual.data);
		expect(expectedStatus).toBe(actual.status);
		expect(expectedMessage).toBe(actual.message);
	});
});

describe('Function getSingle', () => {
	test('Should return User', async () => {
		// arrange
		const userId = 1;

		const expectedData: User = null;
		const expectedStatus: HttpCodes = HttpCodes.Ok;
		const expectedMessage: string = '';

		// act
		const actual = await UserService.getSingle(userId);

		// assert
		expect(expectedData).toBe(actual.data);
		expect(expectedStatus).toBe(actual.status);
		expect(expectedMessage).toBe(actual.message);
	});

	describe('Error Handling', () => {
		test('should throw Error', () => {
			// arrange
			const userId = -1;

			// act
			const action = async () => {
				await UserService.getSingle(userId);
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

		const expectedData: User = null;
		const expectedStatus: HttpCodes = HttpCodes.Ok;
		const expectedMessage: string = '';

		// act
		const actual = await UserService.addSingle(user);

		// assert
		expect(expectedData).toBe(actual.data);
		expect(expectedStatus).toBe(actual.status);
		expect(expectedMessage).toBe(actual.message);
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
		const userId: number = 1;
		const user: User = new User();

		const expectedData: User = null;
		const expectedStatus: HttpCodes = HttpCodes.Ok;
		const expectedMessage: string = '';

		// act
		const actual = await UserService.updateSingle(userId, user);

		// assert
		expect(expectedData).toBe(actual.data);
		expect(expectedStatus).toBe(actual.status);
		expect(expectedMessage).toBe(actual.message);
	});

	describe('Error Handling', () => {
		test('should throw Error', () => {
			// arrange
			const userId: number = -1;
			const user: User = new User();

			// act
			const action = async () => {
				await UserService.updateSingle(userId, user);
			};

			// assert
			expect(action).rejects.toThrow(Error);
		});
	});
});

describe('Function deleteSingle', () => {
	test('Should delete User', async () => {
		// arrange
		const userId: number = 1;

		const expectedData: User = null;
		const expectedStatus: HttpCodes = HttpCodes.Ok;
		const expectedMessage: string = '';

		// act
		const actual = await UserService.deleteSingle(userId);

		// assert
		expect(expectedData).toBe(actual.data);
		expect(expectedStatus).toBe(actual.status);
		expect(expectedMessage).toBe(actual.message);
	});

	describe('Error Handling', () => {
		test('should throw Error', () => {
			// arrange
			const userId: number = -1;

			// act
			const action = async () => {
				await UserService.deleteSingle(userId);
			};

			// assert
			expect(action).rejects.toThrow(Error);
		});
	});
});
