import { ClientError } from './';
import { HttpCodes } from '../../Enums';

export default class NotFoundError extends ClientError {
	constructor(message?: string) {
		super(HttpCodes.NotFound, message);

		Object.setPrototypeOf(this, ClientError.prototype);
	}
}
