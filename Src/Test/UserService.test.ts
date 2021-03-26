import { ServiceResponse, UserService } from '../Services';
import { HttpCodes } from '../Enums';
import { User } from '../Entities';

describe('Function getAll', () => {
	test('Should return User[]', async () => {
		// arrange
		const expectedData: User[] = [];
		const expectedStatus: HttpCodes = HttpCodes.Ok;
		const expectedMessage: string = '';

		// act
		const actual: ServiceResponse = await UserService.getAll();

		// assert
		expect(expectedData).toBe(actual.data);
		expect(expectedStatus).toBe(actual.status);
		expect(expectedMessage).toBe(actual.message);
	});
});

describe('Function getSingle', () => {
	test('Should return User', async () => {
		// arrange
		const email: string = '';

		const expectedData: User = new User();
		const expectedStatus: HttpCodes = HttpCodes.Ok;
		const expectedMessage: string = '';

		// act
		const actual: ServiceResponse = await UserService.getSingle(email);

		// assert
		expect(expectedData).toBe(actual.data);
		expect(expectedStatus).toBe(actual.status);
		expect(expectedMessage).toBe(actual.message);
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

		const expectedData: User = new User();
		const expectedStatus: HttpCodes = HttpCodes.Ok;
		const expectedMessage: string = '';

		// act
		const actual: ServiceResponse = await UserService.addSingle(user);

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
		const email: string = '';
		const user: User = new User();

		const expectedData: User = new User();
		const expectedStatus: HttpCodes = HttpCodes.Ok;
		const expectedMessage: string = '';

		// act
		const actual: ServiceResponse = await UserService.updateSingle(email, user);

		// assert
		expect(expectedData).toBe(actual.data);
		expect(expectedStatus).toBe(actual.status);
		expect(expectedMessage).toBe(actual.message);
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

		const expectedData: User = new User();
		const expectedStatus: HttpCodes = HttpCodes.Ok;
		const expectedMessage: string = '';

		// act
		const actual: ServiceResponse = await UserService.deleteSingle(email);

		// assert
		expect(expectedData).toBe(actual.data);
		expect(expectedStatus).toBe(actual.status);
		expect(expectedMessage).toBe(actual.message);
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
