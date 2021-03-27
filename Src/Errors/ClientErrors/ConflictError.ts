import { ClientError } from './';
import { HttpCodes } from '../../Enums';

export default class ConflictError extends ClientError {
	name: string;

	constructor(message: string, initialName?: string) {
		super(HttpCodes.Conflict, message, initialName);

		Object.setPrototypeOf(this, ConflictError.prototype);
		this.name = this.constructor.name;
	}
}
