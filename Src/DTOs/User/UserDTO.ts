import { User } from '../../Entities';

export default class UserDTO {
	name: string;
	username: string;
	password: string;

	constructor(user: User) {
		this.name = user.name;
		this.username = user.username;
		this.password = user.password;
	}
}
