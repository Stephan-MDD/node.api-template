/// libraries
import 'reflect-metadata';
import * as express from 'express';
import * as dotenv from 'dotenv';

/// modules
import * as Controllers from './Controllers';
import { Monitor } from './Middlewares';

/// content
dotenv.config();
const app: express.Application = express();
const port: number = Number(process.env.SERVER_PORT);

app.use(express.json());
app.use(Monitor.initiate());

// apply Monitor middleware...

Object.values(Controllers).forEach((controller) => {
	app.use(controller.route, controller.router);
});

app.use(Monitor.conclude());

// initialize server
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
