/// libraries
import 'reflect-metadata';
import express from 'express';
import * as dotenv from 'dotenv';

/// modules
import * as Controllers from './Controllers';
import { Monitor, Log } from './Middleware';

/// content
dotenv.config();
const app: express.Application = express();
const port: number = Number(process.env.SERVER_PORT);

app.use(express.json());
app.use(Monitor.initiate());

// aplites all routers
Object.values(Controllers).forEach((controller) => {
	app.use(controller.route, controller.router);
});

app.use(Log.clientErrors());
app.use(Log.serverErrors());

app.use(Monitor.conclude());

// initialize server
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
