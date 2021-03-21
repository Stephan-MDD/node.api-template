import { HttpCodes } from '../Enums';

export default class ServiceResponse {
	data?: any;
	message?: string;
	status: HttpCodes = HttpCodes.Ok;
}
