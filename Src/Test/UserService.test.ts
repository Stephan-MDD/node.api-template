import { UserService } from '../Services';
import { HttpCodes } from '../Enums';
import { User } from '../Models';

test('Function getAll', async () => {
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

describe('Function getSingle', () => {
	test('should return true', async () => {
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
	test('should return true', async () => {
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
