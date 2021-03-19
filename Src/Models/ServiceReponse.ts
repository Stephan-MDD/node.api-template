export default class ServiceResponse<T> {
	data: T;
	message?: string;

	constructor(data: T, message?: string) {
		this.data = data;
		this.message = message;

		// map class to dto
	}
}
