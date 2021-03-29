/// libraries
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

/// modules
import * as Controllers from './Controllers';
import { Monitor, Exception } from './Middleware';
import { DBService } from './Services';

/// content
dotenv.config();

(async () => {
	const port: number = Number(process.env.SERVER_PORT);
	const app: express.Application = express();

	await DBService.initiate();
	app.use(cors());
	app.use(express.json());
	app.use(Monitor.initiate());

	// aplites all routers
	Object.values(Controllers).forEach((controller) => {
		app.use(controller.route, controller.router);
	});

	app.use(Exception.log());
	app.use(Monitor.conclude());
	// handle unhanded errors

	// initialize server
	app.listen(port, () => console.log(`Server listening on \x1b[36mhttp://localhost:${port}\x1b[0m`));

	//disconnects database connection when application is closed
	app.addListener('close', DBService.conclude);
})();
