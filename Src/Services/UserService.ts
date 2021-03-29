/// libraries
import bcrypt from 'bcrypt';

/// modules
import { User } from '../Entities';
import { UserDTO } from '../DTOs/User';
import { BadRequestError, NotFoundError } from '../Errors/ClientErrors';

export async function getAll(): Promise<UserDTO[]> {
	const allUsers: User[] = await User.find();
	return allUsers.map((user) => new UserDTO(user));
}

export async function getSingle(email: string): Promise<UserDTO> {
	const user: User | undefined = await User.findOne({ email });

	if (user === undefined) {
		throw new NotFoundError(`Could not find user with id: ${email}`);
	}

	return new UserDTO(user);
}

export async function addSingle(userNew: User): Promise<UserDTO> {
	const salt: number = Number(process.env.BCRYPT_SALT);
	userNew.password = await bcrypt.hash(userNew.password, salt);

	// DTO mapping
	// ATT:: needs validation
	const user: User = Object.assign(new User(), userNew);

	try {
		await user.save();
	} catch (error) {
		throw new BadRequestError(error.message, error.name);
	}

	return new UserDTO(user);
}

export async function updateSingle(email: string, userUpdate: User): Promise<UserDTO> {
	let user: User | undefined = await User.findOne({ email });

	if (user === undefined) {
		throw new NotFoundError(`Could not find user with id: ${email}`);
	}

	// att:: add bcrypt for password
	user = Object.assign(user, userUpdate);

	await user.save();
	return new UserDTO(user);
}

export async function deleteSingle(email: string): Promise<void> {
	const user: User | undefined = await User.findOne({ email });

	// user not found
	if (user === undefined) {
		throw new NotFoundError(`Could not find user with id: ${email}`);
	}

	await user.remove();
}
