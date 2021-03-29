/// libraries
import * as typeORM from 'typeorm';

export default class DBService {
	static async initiate() {
		await typeORM.createConnection();
	}

	static async conclude() {
		await typeORM.getConnection().close();
	}

	static async setup() {
		// setup test database
	}

	static async populate() {
		// populate test database
	}

	static async drop() {
		// drop test database
	}
}
