import { HttpCodes } from '../Enums';

export default class ServiceResponse<T> {
	data?: T;
	message?: string;
	success: boolean = true;
	status: HttpCodes = HttpCodes.Ok;
}
