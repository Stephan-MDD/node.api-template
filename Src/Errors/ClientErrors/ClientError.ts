import { BaseError } from '..';
import { HttpCodes } from '../../Enums';

export default class ClientError extends BaseError {
	type: string;

	constructor(status: HttpCodes, message: string, initialError?: string) {
		super(status, message, initialError);

		Object.setPrototypeOf(this, ClientError.prototype);
		this.type = this.constructor.name;
	}
}
