import ServiceResponse from './ServiceResponse';
// import { Monitor } from '../Models';

// att:: change type 'any' to correct model (monitor)?
export async function getRequests(entry: Date, exit: Date): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	response.data = null;
	return response;
}
