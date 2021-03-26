import { HttpCodes } from '../Enums';

export default class BaseError extends Error {
	status: HttpCodes;
	initialName?: string;

	constructor(status: HttpCodes, message: string, initialError?: string) {
		super(message);
		this.status = status;
		this.initialName = initialError;

		Object.setPrototypeOf(this, BaseError.prototype);
	}
}
