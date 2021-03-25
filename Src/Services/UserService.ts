import bcrypt from 'bcrypt';

import ServiceResponse from './ServiceResponse';
import { User } from '../Entities';
import { HttpCodes } from '../Enums';
import { UserDTO } from '../DTOs/User';
import { NotFoundError } from '../Errors/ClientErrors';

export async function getAll(): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	const allUsers: User[] = await User.find();

	response.data = allUsers.map((user) => new UserDTO(user));
	return response;
}

export async function getSingle(id: number): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	const user: User | undefined = await User.findOne(id);

	// user not found
	if (user === undefined) {
		throw new NotFoundError(`Could not find user with id: ${id}`);
	}

	response.data = new UserDTO(user);

	return response;
}

export async function addSingle(userNew: User): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	const user: User = new User();

	const salt: string = String(process.env.BCRYPT_SALT);
	const passwordHash = await bcrypt.hash(userNew.password, salt);

	user.name = userNew.name;
	user.username = userNew.username;
	user.password = passwordHash;
	await user.save();

	response.data = new UserDTO(user);
	response.status = HttpCodes.Created;

	return response;
}

export async function updateSingle(id: number, userUpdate: User): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	const user: User | undefined = await User.findOne(id);

	// user not found
	if (user === undefined) {
		throw new NotFoundError(`Could not find user with id: ${id}`);
	}

	// add bcrypt for password
	if (userUpdate.name) user.name = userUpdate.name;
	if (userUpdate.username) user.username = userUpdate.username;
	if (userUpdate.password) user.password = userUpdate.password;

	await user.save();
	response.data = new UserDTO(user);

	return response;
}

export async function deleteSingle(id: number): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	const user: User | undefined = await User.findOne(id);

	// user not found
	if (user === undefined) {
		throw new NotFoundError(`Could not find user with id: ${id}`);
	}

	await user.remove();
	response.status = HttpCodes.Accepted;

	return response;
}
