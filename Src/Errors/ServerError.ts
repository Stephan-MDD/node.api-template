import { BaseError } from './';
import { HttpCodes } from '../Enums';

export default class ServerError extends BaseError {
	constructor(status: HttpCodes, message?: string) {
		super(status, message);
	}
}
