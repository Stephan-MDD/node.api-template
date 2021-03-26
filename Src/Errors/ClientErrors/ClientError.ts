import { BaseError } from '..';
import { HttpCodes } from '../../Enums';

export default class ClientError extends BaseError {
	constructor(status: HttpCodes, message: string, initialError?: string) {
		super(status, message, initialError);

		Object.setPrototypeOf(this, ClientError.prototype);
	}
}
