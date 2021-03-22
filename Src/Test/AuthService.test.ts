import { AuthService } from '../Services';

function example(shouldThrow: boolean = false) {
	if (shouldThrow) throw new Error('Example Error');
	return true;
}

describe('Function example', () => {
	test('should return true', () => {
		// arrange
		const expected: boolean = true;

		// act
		const actual = example();

		// assert
		expect(actual).toBe(expected);
	});

	describe('Error Handling', () => {
		test('should throw Error', () => {
			const action = () => {
				example(true);
			};

			// assert
			expect(action).toThrow(Error);
		});
	});
});
