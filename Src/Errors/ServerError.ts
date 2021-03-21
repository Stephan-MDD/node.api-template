import { BaseError } from './';
import { HttpCodes } from '../Enums';

export default class ServerError extends BaseError {
	type: string = 'server';

	constructor(status: HttpCodes, message?: string) {
		super(status, message);

		Object.setPrototypeOf(this, ServerError.prototype);
	}
}
