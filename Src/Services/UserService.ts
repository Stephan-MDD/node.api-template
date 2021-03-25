import ServiceResponse from './ServiceResponse';
import { User } from '../Entities';
import { HttpCodes } from '../Enums';

/**
 * add try catch for errors
 *
 * add connection in controller
 * - try catch finally -> close connection
 */

export async function getAll(): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	const allUsers: User[] = await User.find();

	response.data = allUsers;
	return response;
}

export async function getSingle(id: number): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	const user: User | undefined = await User.findOne(id);

	// user not found
	if (user === undefined) {
		response.message = `Could not find user with id: ${id}`;
		response.status = HttpCodes.NotFound;
		return response;
	}

	response.data = user;

	return response;
}

export async function addSingle(userNew: User): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	const user: User = new User();

	// add bcrypt for password
	user.name = userNew.name;
	user.username = userNew.username;
	user.password = userNew.password;
	await user.save();

	response.data = user; // DTO?
	response.status = HttpCodes.Created;

	return response;
}

export async function updateSingle(id: number, userUpdate: User): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	const user: User | undefined = await User.findOne(id);

	// user not found
	if (user === undefined) {
		response.message = `Could not find user with id: ${id}`;
		response.status = HttpCodes.NotFound;
		return response;
	}

	// add bcrypt for password
	if (userUpdate.name) user.name = userUpdate.name;
	if (userUpdate.username) user.username = userUpdate.username;
	if (userUpdate.password) user.password = userUpdate.password;

	await user.save();
	response.data = user;

	return response;
}

export async function deleteSingle(id: number): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	const user: User | undefined = await User.findOne(id);

	// user not found
	if (user === undefined) {
		response.message = `Could not find user with id: ${id}`;
		response.status = HttpCodes.NotFound;
		return response;
	}

	await user.remove();
	response.status = HttpCodes.Accepted;

	return response;
}
