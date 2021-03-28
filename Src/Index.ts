/// libraries
import 'reflect-metadata';
import express from 'express';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';

/// modules
import * as Routers from './Routers';
import { Monitor, Exception } from './Middleware';

/// content
(async () => {
	dotenv.config();
	const port: number = Number(process.env.SERVER_PORT);
	const app: express.Application = express();

	await createConnection();
	app.use(express.json());
	app.use(Monitor.initiate());

	// aplites all routers
	Object.values(Routers).forEach((router) => {
		app.use(router.route, router.router);
	});

	app.use(Exception.log());
	app.use(Monitor.conclude());
	// handle unhanded errors

	// initialize server
	app.listen(port, () => console.log(`Server listening on \x1b[36mhttp://localhost:${port}\x1b[0m`));
})();
