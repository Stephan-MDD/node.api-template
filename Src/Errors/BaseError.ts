import { HttpCodes } from '../Enums';

export default class BaseError extends Error {
	status: HttpCodes;
	initialName?: string;
	type?: string;

	constructor(status: HttpCodes, message: string, initialName?: string) {
		super(message);
		this.status = status;
		this.initialName = initialName;

		Object.setPrototypeOf(this, BaseError.prototype);
	}
}
