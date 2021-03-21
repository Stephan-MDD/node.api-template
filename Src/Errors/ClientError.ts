import { BaseError } from './';
import { HttpCodes } from '../Enums';

export default class ClientError extends BaseError {
	code?: string;

	constructor(status: HttpCodes, code?: string, message?: string) {
		super(status, message);
		this.code = code;
	}
}
